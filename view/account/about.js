import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    YellowBox,
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

    render() {
        YellowBox.ignoreWarnings([
            'Warning: componentWillReceiveProps',
        ]);
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
                                About Us
                        </Text>

                        </View>

                        <View style={{ marginTop: 20, justifyContent: 'center', alignItems: 'center' }} >
                            <Text style={{ color: '#f5a21d', fontSize: hp('3%'), fontWeight: 'bold' }}>
                                Golden Garuda Bali
                        </Text>
                            <View style={{width: '85%',}}>
                            <Text style={{textAlign:'justify', marginTop: 15, color: '#f5a21d', fontSize: hp('1.7%'), }}>
                                Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                                 Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
                                 when an unknown printer took a galley of type and scrambled it to make a type specimen book. 
                                 It has survived not only five centuries, but also the leap into electronic typesetting, remaining 
                                 essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing 
                                 Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including
                                  versions of Lorem Ipsum.
                        </Text>
                            </View>
                        </View>
                    </View>

                    <Image
                        source={require('../../assets/icon3.png')} style={{
                            position: 'absolute',
                            resizeMode: 'contain',  width: wp('100%'), height: hp('12%'), bottom: 0, left: 0
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