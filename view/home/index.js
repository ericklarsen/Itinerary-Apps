import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    YellowBox,
    LogBox
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'
import AsyncStorage from '@react-native-community/async-storage'

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
        header:null
    }
    toForm = () => {
        this.props.navigation.navigate('form1');
    }

    toItinerary = () => {
        this.props.navigation.navigate('itinerary',{
            username : this.state.username
        });
    }

    toAccount = () => {
        this.props.navigation.navigate('account');
    }

    toHome = () => {
        this.props.navigation.navigate('home');
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

                        <View style={{ marginTop: 20, marginLeft: 30, height: hp('8%'), borderBottomColor: '#f5a21d', borderBottomWidth: 0.5 }}>
                            <Text style={{ color: '#f5a21d', fontSize: hp('4%'), fontWeight: 'bold' }}>
                               Create itinerary
                        </Text>
                        </View>
                        {/* <View style={{ borderBottomColor: '#f5a21d', borderBottomWidth: 0.5, alignItems: 'center', marginVertical: 15, }}>

                    </View> */}
                        <View style={{ marginTop: 15, marginLeft: 30 }}>
                            <Text style={{ color: '#f5a21d', marginBottom: 15, fontSize: hp('1.85%') }}>
                                "Press button below to create itinerary"
                        </Text>
                            <TouchableOpacity
                                onPress={this.toForm}
                                style={{ width: wp('40%'), height: hp('6%'), backgroundColor: '#f5a21d', flexDirection:'row', justifyContent: 'center', alignItems: 'center', }}>
                                <Icon name='ios-add-circle-outline' size={hp('3%')} type='ionicon' color='black' />
                                <Text style={{marginLeft:6, fontSize: hp('2%'), fontWeight: 'bold' }}>
                                    Create New
                            </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{ flex: 1, alignItems: 'center', }}>
                        <Image
                            source={require('../../assets/icon2.png')} style={{ position: 'relative', flex: 3, left: wp('6%'), resizeMode: 'contain', width: wp('100%'), }} />
                    </View>
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