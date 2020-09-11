import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    TextInput,
    YellowBox,
    Alert,
    LogBox
} from 'react-native';
import moment from 'moment'
import { Snackbar } from 'react-native-paper';
import AsyncStorage from '@react-native-community/async-storage'
import Icon from 'react-native-vector-icons/Ionicons'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            email: '',
            phone: '',
            visible: false,
            alert: ''
        };
    }


    toNext = () => {
        fetch('https://goldengarudabali.com/goldengarudabali.com/api/register.php', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: this.state.username,
                password: this.state.password,
                email: this.state.email,
                phone: this.state.phone,

            })
        }).then((response) => response.json())
            .then((responseJson) => {
                // Alert.alert(JSON.stringify(responseJson))
                if (responseJson == 'failed') {
                    this.setState({ alert: 'Username / password already exist', visible: !this.state.visible })
                } else if (responseJson == 'success') {
                    // this.setState({alert : 'Welcome to apps!', visible: !this.state.visible})
                    Alert.alert('Register Success!')
                    this.props.navigation.navigate('login');
                }
            }).catch((error) => {
                console.error(error);
            })

    }

    render() {
        YellowBox.ignoreWarnings([
            'Warning: DatePickerAndroid',
        ]);
        return (
            <View style={{ flex: 1, backgroundColor: '#242121', alignItems: 'center', }}>
                <Image source={require('../../assets/bg.png')} style={{ position: 'absolute', resizeMode: 'contain', }} />
                <View style={{
                    flex: 4, justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center',
                    width: '80%', marginTop: 20,
                }}>
                    <Image source={require('../../assets/logo1.png')} style={{ position: 'relative', resizeMode: 'contain', width: wp('30%') }} />

                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <View style={{ alignItems: 'flex-end' }}>
                            <Text style={{ color: '#f5a21d', fontSize: hp('3.5%'), fontWeight: 'bold' }}>
                                REGISTER
                        </Text>
                            <Text style={{ marginTop: 5, color: '#f5a21d', fontSize: hp('2.5%'), }}>
                                Menu
                        </Text>
                        </View>

                        <View style={{ marginLeft: 15, height: hp('10%'), width: 2, backgroundColor: '#f5a21d' }}>

                        </View>
                    </View>
                </View>
                <View style={{ flex: 8, marginTop: 10, width: '80%', }}>
                    <View style={{
                        marginTop: 20, marginBottom: 20, flexDirection: 'row', alignItems: 'center',
                        borderBottomWidth: 0.5, borderBottomColor: '#f5a21d',
                    }}>
                        <Icon name='ios-person' size={hp('3%')} type='ionicon' color='#f5a21d' />

                        <TextInput
                            placeholderTextColor="#f5a21d"
                            placeholder='Username'
                            onChangeText={TextInputValue => this.setState({ username: TextInputValue })}
                            style={{
                                color: '#f5a21d', paddingHorizontal: 10, width: '100%', height: hp('7%'), justifyContent: 'center',
                                alignItems: 'center'
                            }}
                        />
                    </View>

                    <View style={{
                        marginBottom: 20, flexDirection: 'row', alignItems: 'center',
                        borderBottomWidth: 0.5, borderBottomColor: '#f5a21d',
                    }}>
                        <Icon name='ios-lock' size={hp('3%')} type='ionicon' color='#f5a21d' />

                        <TextInput
                        secureTextEntry = {true}
                            placeholderTextColor="#f5a21d"
                            placeholder='Password'
                            onChangeText={TextInputValue => this.setState({ password: TextInputValue })}
                            style={{
                                color: '#f5a21d', paddingHorizontal: 10, width: '100%', height: hp('7%'), justifyContent: 'center',
                                alignItems: 'center'
                            }}
                        />
                    </View>

                    <View style={{
                        marginBottom: 20, flexDirection: 'row', alignItems: 'center',
                        borderBottomWidth: 0.5, borderBottomColor: '#f5a21d',
                    }}>
                        <Icon name='ios-at' size={hp('3%')} type='ionicon' color='#f5a21d' />

                        <TextInput
                            placeholderTextColor="#f5a21d"
                            placeholder='Email'
                            onChangeText={TextInputValue => this.setState({ email: TextInputValue })}
                            style={{
                                color: '#f5a21d', paddingHorizontal: 10, width: '100%', height: hp('7%'), justifyContent: 'center',
                                alignItems: 'center'
                            }}
                        />
                    </View>

                    <View style={{
                        marginBottom: 40, flexDirection: 'row', alignItems: 'center',
                        borderBottomWidth: 0.5, borderBottomColor: '#f5a21d',
                    }}>
                        <Icon name='ios-call' size={hp('3%')} type='ionicon' color='#f5a21d' />

                        <TextInput
                            placeholderTextColor="#f5a21d"
                            placeholder='Phone'
                            onChangeText={TextInputValue => this.setState({ phone: TextInputValue })}
                            style={{
                                color: '#f5a21d', paddingHorizontal: 10, width: '100%', height: hp('7%'), justifyContent: 'center',
                                alignItems: 'center'
                            }}
                        />
                    </View>

                    <View style={{ alignItems: 'center' }}>
                        <TouchableOpacity
                            onPress={this.toNext}
                            style={{ height: hp('8%'), width: wp('40%'), borderRadius: 60, backgroundColor: '#f5a21d', justifyContent: 'center', alignItems: 'center', }}>
                            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
                                Register
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