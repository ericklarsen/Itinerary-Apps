import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    YellowBox,
    ActivityIndicator,
    TextInput,
    LogBox
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'
import AsyncStorage from '@react-native-community/async-storage'
import { Avatar, Snackbar } from 'react-native-paper';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';


class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            username: '',
            password: '',
            email: '',
            phone: '',
            alert: '',
            refreshing: true,
        };

        AsyncStorage.getItem('username', (error, result) => {
            if (result) {
                this.setState({
                    username: result
                });
            }
        });
    }
    static navigationOptions = {
        header: null
    }

    componentDidMount() {
        AsyncStorage.getItem('username', (error, result) => {
            if (result) {

                var url1 = 'https://goldengarudabali.com/goldengarudabali.com/api/view_user.php'
                // var url2 = 'https://goldengarudabali.com/goldengarudabali.com/api/view_hs.php'
                return fetch(url1
                    , {
                        method: 'POST',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            username: result,

                        })
                    }
                ).then((response) => response.json())
                    .then((responseJson) => {
                        const data = responseJson;
                        data.map((Object, idx) => {
                            this.setState({
                                isLoading: false,
                                username: Object.username,
                                password: Object.password,
                                email: Object.email,
                                phone: Object.phone,
                            }, function () {
                            })
                        })

                        console.log(this.state.dataSource)
                        console.log('---------------------------')

                    }).catch((error) => {
                        console.error(error);
                    })

            }
        });
    }

    toForm = () => {
        this.props.navigation.navigate('form1');
    }

    toItinerary = () => {
        this.props.navigation.navigate('itinerary', {
            username: this.state.username
        });
    }

    toHome = () => {
        this.props.navigation.navigate('home');
    }

    toAccount = () => {
        this.props.navigation.navigate('account');
    }

    toBack = () => {
        this.props.navigation.navigate('account');
    }

    toSave = () => {
        fetch('https://goldengarudabali.com/goldengarudabali.com/api/update_user.php', {
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
                    this.setState({ alert: 'Update data failed! Check your data', visible: !this.state.visible })
                } else if (responseJson == 'success') {
                    this.setState({alert : 'Update data success!', visible: !this.state.visible})
                }
            }).catch((error) => {
                console.error(error);
            })
    }

    render() {
        YellowBox.ignoreWarnings([
            'Warning: componentWillReceiveProps',
        ]);
        if (this.state.isLoading) {
            return (
                <View style={{ flex: 1, paddingTop: 20 }}>
                    <ActivityIndicator />
                </View>
            )

        }
        return (
            <View style={{ flex: 1, backgroundColor: '#242121', }}>
                <Image source={require('../../assets/bg.png')} style={{ position: 'absolute', resizeMode: 'contain', }} />


                <View style={{ flex: 10, marginTop: 20 }}>
                    <View style={{ flex: 1 }}>

                        <View style={{
                            flexDirection: 'row', alignItems: 'center',
                            marginLeft: 30, height: hp('10%'), borderBottomColor: '#f5a21d', borderBottomWidth: 0.5
                        }}>
                            <TouchableOpacity onPress={this.toBack}>
                                <Icon name='ios-arrow-back' size={hp('3.8%')} type='ionicon' color='#f5a21d' />

                            </TouchableOpacity>

                            <Text style={{ marginLeft: 20, color: '#f5a21d', fontSize: hp('3.8%'), fontWeight: 'bold' }}>
                                Account Edit
                        </Text>

                        </View>
                        {/* <View style={{ borderBottomColor: '#f5a21d', borderBottomWidth: 0.5, alignItems: 'center', marginVertical: 15, }}>

                    </View> */}
                        <View style={{
                            marginTop: 20, marginLeft: 30, height: hp('8%'), alignItems: 'center', flexDirection: 'row'
                        }}>
                            <Icon name='ios-person' size={hp('3.5%')} type='ionicon' color='#f5a21d' />
                            <TextInput
                                editable={false}
                                placeholderTextColor="#f5a21d"
                                value={this.state.username}
                                placeholder='Username'
                                onChangeText={TextInputValue => this.setState({ username: TextInputValue })}
                                style={{
                                    color: '#f5a21d', paddingHorizontal: 20, width: wp('60%'), height: hp('8%'), fontSize: hp('2%'),
                                    justifyContent: 'center', alignItems: 'center',
                                }}
                            />

                        </View>
                        <View style={{
                            marginLeft: 30, height: hp('8%'), borderBottomColor: '#f5a21d', borderBottomWidth: 0.5,
                            borderTopColor: '#f5a21d', borderTopWidth: 0.5, alignItems: 'center', flexDirection: 'row'
                        }}>
                            <Icon name='ios-lock' size={hp('3.5%')} type='ionicon' color='#f5a21d' />
                            <TextInput
                                secureTextEntry={true}
                                placeholderTextColor="#f5a21d"
                                value={this.state.password}
                                placeholder='Password'
                                onChangeText={TextInputValue => this.setState({ password: TextInputValue })}
                                style={{
                                    color: '#f5a21d', paddingHorizontal: 20, width: wp('60%'), height: hp('8%'), fontSize: hp('2%'),
                                    justifyContent: 'center', alignItems: 'center',
                                }}
                            />

                        </View>
                        <View style={{
                            marginLeft: 30, height: hp('8%'), borderBottomColor: '#f5a21d', borderBottomWidth: 0.5,
                            alignItems: 'center', flexDirection: 'row'
                        }}>
                            <Icon name='ios-at' size={hp('3.5%')} type='ionicon' color='#f5a21d' />
                            <TextInput
                                placeholderTextColor="#f5a21d"
                                value={this.state.email}
                                placeholder='Email'
                                onChangeText={TextInputValue => this.setState({ email: TextInputValue })}
                                style={{
                                    color: '#f5a21d', paddingHorizontal: 20, width: wp('60%'), height: hp('8%'), fontSize: hp('2%'),
                                    justifyContent: 'center', alignItems: 'center',
                                }}
                            />

                        </View>
                        <View style={{
                            marginLeft: 30, height: hp('8%'), borderBottomColor: '#f5a21d', borderBottomWidth: 0.5,
                            alignItems: 'center', flexDirection: 'row'
                        }}>
                            <Icon name='ios-call' size={hp('3.5%')} type='ionicon' color='#f5a21d' />
                            <TextInput
                                keyboardType='numeric'
                                placeholderTextColor="#f5a21d"
                                value={this.state.phone}
                                placeholder='phone'
                                onChangeText={TextInputValue => this.setState({ phone: TextInputValue })}
                                style={{
                                    color: '#f5a21d', paddingHorizontal: 20, width: wp('60%'), height: hp('8%'), fontSize: hp('2%'),
                                    justifyContent: 'center', alignItems: 'center',
                                }}
                            />

                        </View>

                        <View style={{
                            marginLeft: 30, height: hp('8%'),
                            alignItems: 'center', flexDirection: 'row', marginTop: 20
                        }}>
                            <TouchableOpacity
                            onPress = {this.toSave}
                                style={{
                                    alignItems: 'center', flexDirection: 'row', height: hp('6%'), width: '100%',
                                    backgroundColor: '#f5a21d', paddingLeft: 20
                                }}>
                                <Icon name='ios-checkmark' size={hp('5%')} type='ionicon' color='black' />
                                <Text style={{ marginLeft: 10, color: 'black', fontSize: hp('2.5%'), fontWeight: 'bold' }}>
                                    Save
                                </Text>
                            </TouchableOpacity>

                        </View>
                    </View>

                    <Image
                        source={require('../../assets/icon3.png')} style={{
                            position: 'absolute',
                            resizeMode: 'contain', width: wp('100%'), height: hp('12%'), bottom: 0, left: 0
                        }} />
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