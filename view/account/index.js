import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    YellowBox,
    Alert,
    LogBox
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'
import AsyncStorage from '@react-native-community/async-storage'
import { Avatar } from 'react-native-paper';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';


class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            dataSource: '',
            username: '',
            refreshing: true,
        };
        this.arrayHolder = [];

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

    toAccountEdit = () => {
        this.props.navigation.navigate('accountEdit');
    }

    toAccountAbout = () => {
        this.props.navigation.navigate('accountAbout');
    }
    
    toLogout = async() =>{
        Alert.alert('Thank you for using this Apps!')
        await AsyncStorage.clear()
        this.props.navigation.navigate('Auths') 
      }

    render() {
        YellowBox.ignoreWarnings([
            'Warning: componentWillReceiveProps',
        ]);
        return (
            <View style={{ flex: 1, backgroundColor: '#242121', }}>
                <Image source={require('../../assets/bg.png')} style={{ position: 'absolute', resizeMode: 'contain', }} />


                <View style={{ flex: 10, marginTop: 20 }}>
                    <View style={{ flex: 1 }}>

                        <View style={{ marginTop: 20, marginLeft: 30, height: hp('8.5%'), borderBottomColor: '#f5a21d', borderBottomWidth: 0.5 }}>
                            <Text style={{ color: '#f5a21d', fontSize: hp('3.8%'), fontWeight: 'bold' }}>
                                Account Setting
                        </Text>

                        </View>
                        {/* <View style={{ borderBottomColor: '#f5a21d', borderBottomWidth: 0.5, alignItems: 'center', marginVertical: 15, }}>

                    </View> */}
                        <View style={{ height: 130, justifyContent: 'center', marginTop: 15, marginLeft: 30 }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Avatar.Icon size={hp('8%')} style={{ backgroundColor: '#C40000' }} icon="account" />
                                <View>
                                    <Text style={{ marginLeft: 15, color: '#f5a21d', fontSize: hp('2%') }}>
                                        Username
                                    </Text>
                                    <Text style={{ marginLeft: 15, color: '#f5a21d', fontSize: hp('4%'), fontWeight: 'bold' }}>
                                        {this.state.username}
                                    </Text>
                                </View>
                            </View>

                            {/* <TouchableOpacity
                                onPress={this.toForm}
                                style={{ width: 180, height: 45, backgroundColor: '#f5a21d', justifyContent: 'center', alignItems: 'center', }}>
                                <Text style={{ fontSize: 15, fontWeight: 'bold' }}>
                                    Create New
                            </Text>
                            </TouchableOpacity> */}

                        </View>
                        <View style={{
                            marginTop: 20, marginLeft: 30, height: hp('8%'), 
                            borderTopColor: '#f5a21d', borderTopWidth: 0.5, alignItems: 'center', flexDirection: 'row'
                        }}>
                            <TouchableOpacity
                            onPress = {this.toAccountEdit}
                            style={{alignItems: 'center', flexDirection: 'row'}}>
                                <Icon name='ios-build' size={hp('3%')} type='ionicon' color='#f5a21d' />
                                <Text style={{ marginLeft: 10, color: '#f5a21d', fontSize: hp('2%'), }}>
                                Edit account data
                                </Text>
                            </TouchableOpacity>

                        </View>
                        <View style={{marginLeft: 30, height: hp('8%'), borderBottomColor: '#f5a21d', borderBottomWidth: 0.5,
                            borderTopColor: '#f5a21d', borderTopWidth: 0.5, alignItems: 'center', flexDirection: 'row'
                        }}>
                            <TouchableOpacity
                            onPress = {this.toAccountAbout}
                            style={{alignItems: 'center', flexDirection: 'row'}}>
                                <Icon name='ios-information-circle-outline' size={hp('3%')} type='ionicon' color='#f5a21d' />
                                <Text style={{ marginLeft: 10, color: '#f5a21d', fontSize: hp('2%'), }}>
                                About us
                                </Text>
                            </TouchableOpacity>

                        </View>
                        <View style={{
                            marginLeft: 30, height: hp('8%'), borderBottomColor: '#f5a21d', borderBottomWidth: 0.5,
                            alignItems: 'center', flexDirection: 'row'
                        }}>
                            <TouchableOpacity
                            onPress = {this.toLogout}
                            style={{alignItems: 'center', flexDirection: 'row'}}>
                                <Icon name='ios-log-out' size={hp('3%')} type='ionicon' color='#f5a21d' />
                                <Text style={{ marginLeft: 10, color: '#f5a21d', fontSize: hp('2%'), }}>
                                    Log out
                                </Text>
                            </TouchableOpacity>

                        </View>
                        <View style={{
                            marginLeft: 30, height: hp('8%'),
                            alignItems: 'center', flexDirection: 'row',
                        }}>

                            <Text style={{ color: '#f5a21d', fontSize: hp('1.7%'), fontStyle: 'italic' }}>
                                Apps Version V.1
                        </Text>

                        </View>
                    </View>

                    <Image
                        source={require('../../assets/icon3.png')} style={{
                            position: 'absolute',
                            resizeMode: 'contain', width: wp('100%'), height: hp('12%'), bottom: 0,
                        }} />
                </View>

                <View style={{ flex: 1.1, backgroundColor: '#141212', flexDirection: 'row' }}>
                    <TouchableOpacity
                    onPress = {this.toHome}
                        style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}>
                        <Icon name='ios-home' size={hp('3%')} type='ionicon' color='#f5a21d' />
                        <Text style={{ fontSize: hp('1.5%'), color: '#f5a21d', }}>
                            Home
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                     onPress = {this.toItinerary}
                    style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}>
                        <Icon name='ios-today' size={hp('3%')} type='ionicon' color='#f5a21d' />
                        <Text style={{ fontSize: hp('1.5%'), color: '#f5a21d', }}>
                            Itinerary
                        </Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity
                     onPress = {this.toAccount}
                    style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}>
                        <Icon name='ios-person' size={hp('3%')} type='ionicon' color='#f5a21d' />
                        <Text style={{ fontSize: hp('1.5%'), color: '#f5a21d', }}>
                            Account
                        </Text>
                    </TouchableOpacity>
                </View>

            </View>
        )
    }
}

export default index