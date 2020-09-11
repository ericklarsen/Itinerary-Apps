import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';



class start extends Component {

  toLogin = () => {
    this.props.navigation.navigate('login');
  }

  toRegister = () => {
    this.props.navigation.navigate('register');
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: '#242121', alignItems: 'center', }}>
        <Image source={require('../assets/bg.png')} style={{ position: 'absolute', resizeMode: 'contain', }} />
        <View style={{ marginTop: 90 }}>
          <Image source={require('../assets/logo1.png')} style={{ resizeMode: 'contain', width: wp('59%'), height: wp('80%'), top: 0, position: 'relative' }} />
        </View>
        <View style={{ marginTop: 20 }}>
          <Text style={{ color: '#f5a21d', fontFamily: 'Mont', fontWeight: "600" }}>
            "Welcome to our Apps!"
          </Text>
        </View>
        <View style={{ marginTop: 20, alignItems: 'center' }}>
          <TouchableOpacity
            onPress={this.toLogin}
            style={{
              marginTop: 10, height: hp('8%'), width: wp('50%'), borderRadius: 60,
              flexDirection: 'row', borderWidth: 1, justifyContent: 'center',
              alignItems: 'center', borderColor : '#f5a21d'
            }}>
            <Icon name='ios-log-in' size={hp('3%')} type='ionicon' color='#f5a21d' />

            <Text style={{ marginLeft: 5, color: '#f5a21d', fontSize: hp('2%'), fontWeight: 'bold' }}>
              Login
            </Text>
          </TouchableOpacity>
          <TouchableOpacity 
            onPress={this.toRegister}
            style={{
            marginTop: 10, height: hp('8%'), width: wp('50%'), borderRadius: 60,
            flexDirection: 'row', borderWidth: 1, justifyContent: 'center',
            alignItems: 'center', borderColor : '#f5a21d'
          }}>
            <Icon name='ios-add-circle-outline' size={hp('3%')} type='ionicon' color='#f5a21d' />

            <Text style={{ marginLeft: 5, color: '#f5a21d', fontSize: hp('2%'), fontWeight: 'bold' }}>
              Register
            </Text>
          </TouchableOpacity>
        </View>
        <Text style={{ fontSize: hp('1.5%'), color: '#c5841d', bottom: 0, position: 'absolute', marginBottom: 20 }}>
          All right reserved by Golden Garuda Bali © 2019
        </Text>

      </View>
    )
  }
}

export default start