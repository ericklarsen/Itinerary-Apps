import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    TextInput,
    YellowBox,
    Alert,
    LogBox,
} from 'react-native';
import moment from 'moment'
import { Snackbar } from 'react-native-paper';
import AsyncStorage from '@react-native-community/async-storage'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            visible: false,
            alert: ''
        };
    }


    toNext = () => {
        fetch('https://goldengarudabali.com/goldengarudabali.com/api/login.php', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: this.state.username,
                password: this.state.password,

            })
        }).then((response) => response.json())
            .then((responseJson) => {
                // Alert.alert(JSON.stringify(responseJson))                    
                if (responseJson == 'none') {
                    this.setState({ alert: 'Please fill username and password!', visible: !this.state.visible })
                } else if (responseJson == 'failed') {
                    this.setState({ alert: 'Username / password wrong!', visible: !this.state.visible })
                } else if (responseJson == 'dactive') {
                    this.setState({ alert: 'Account not active, please contact admin to active it!', visible: !this.state.visible })
                } else if (responseJson == 'active') {
                    // this.setState({alert : 'Welcome to apps!', visible: !this.state.visible})
                    Alert.alert('Welcome to apps!')
                    AsyncStorage.setItem('username', this.state.username);
                    AsyncStorage.setItem('isLoggedIn','1');
                    this.props.navigation.navigate('home');
                }
            }).catch((error) => {
                console.error(error);
            })

    }

    render() {
        YellowBox.ignoreWarnings([
            'Warning: DatePickerAndroid',
            'Require cycle:',
        ]);
        return (
            <View style={{ flex: 1, backgroundColor: '#242121', alignItems: 'center', }}>
                <Image source={require('../../assets/bg.png')} style={{ position: 'absolute', resizeMode: 'contain', }} />
                <View style={{
                    flex: 4, justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center',
                    width: '80%', marginTop: 20,
                }}>
                    <Image source={require('../../assets/logo1.png')} style={{ position: 'relative', resizeMode: 'contain', width: 140 }} />

                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <View style={{ alignItems: 'flex-end' }}>
                            <Text style={{ color: '#f5a21d', fontSize: hp('5%'), fontWeight: 'bold' }}>
                                LOGIN
                        </Text>
                            <Text style={{ marginTop: 5, color: '#f5a21d', fontSize: hp('3%'), }}>
                                Menu
                        </Text>
                        </View>

                        <View style={{ marginLeft: 15, height: 80, width: 2, backgroundColor: '#f5a21d' }}>

                        </View>
                    </View>
                </View>
                <View style={{ flex: 5, marginTop: 10, width: '80%' }}>
                    <View style={{ marginTop: 20, marginBottom: 20 }}>
                        <Text style={{ color: '#f5a21d', fontSize: hp('2%'), fontWeight: 'bold' }}>
                            Username
                        </Text>
                        <TextInput
                            placeholderTextColor="#f5a21d"
                            placeholder='Username'
                            onChangeText={TextInputValue => this.setState({ username: TextInputValue })}
                            style={{ color: '#f5a21d', paddingHorizontal: 20, width: '100%', height: hp('7%'), justifyContent: 'center', alignItems: 'center', borderWidth: 0.5, borderColor: '#f5a21d', marginTop: 10 }}
                        />
                    </View>
                    <View style={{ marginBottom: 40 }}>
                        <Text style={{ color: '#f5a21d', fontSize: hp('2%'), fontWeight: 'bold' }}>
                            Password
                        </Text>
                        <TextInput
                            secureTextEntry={true}
                            placeholderTextColor="#f5a21d"
                            placeholder='Password'
                            onChangeText={TextInputValue => this.setState({ password: TextInputValue })}
                            style={{ color: '#f5a21d', paddingHorizontal: 20, width: '100%', height: hp('7%'), justifyContent: 'center', alignItems: 'center', borderWidth: 0.5, borderColor: '#f5a21d', marginTop: 10 }}
                        />
                    </View>
                    <View style={{ alignItems: 'center' }}>
                        <TouchableOpacity
                            onPress={this.toNext}
                            style={{ height: hp('8%'), width: hp('25%'), borderRadius: 60, backgroundColor: '#f5a21d', justifyContent: 'center', alignItems: 'center', }}>
                            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
                                Login
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <Snackbar
                    visible={this.state.visible}
                    onDismiss={() => this.setState({ visible: false })}
                    action={{
                        label: 'Close',
                        onPress: () => {
                            // Do something
                        },
                    }}
                >
                    {this.state.alert}
                </Snackbar>
            </View>
        )
    }
}

export default index