import React, { Component } from 'react';
import {
  createAppContainer,
  createSwitchNavigator
} from 'react-navigation'
import {
  createStackNavigator
} from 'react-navigation-stack'
import { createBottomTabNavigator, createMaterialTopTabNavigator } from 'react-navigation-tabs';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons'
import indexStart from './view/start'
import indexLogin from './view/login/login'
import indexRegister from './view/login/register'
import indexHome from './view/home/index'
import indexNext1 from './view/home/form1'
import indexNext2 from './view/home/form2'
import indexNext3 from './view/home/form3'
import indexNext3_1 from './view/home/form3_1'
import indexNext4 from './view/home/form4'
import indexNext5 from './view/home/form5'
import itineraryHome from './view/itinerary/index'
import itineraryDetail from './view/itinerary/detail'
import accountHome from './view/account/index'
import accountEdit from './view/account/edit'
import accountAbout from './view/account/about'
import { fromRight, fromTop } from 'react-navigation-transitions';
import { View, StatusBar, StyleSheet,ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
let app;
app = {} || app;


const home = createStackNavigator({
  home: { screen: indexHome },
  itinerary: { screen: itineraryHome },
  itineraryDetail: { screen: itineraryDetail },
  account: { screen: accountHome },
  accountEdit: { screen: accountEdit },
  accountAbout: { screen: accountAbout },
  form1: { screen: indexNext1 },
  form2: { screen: indexNext2 },
  form3: { screen: indexNext3 },
  form3_1: { screen: indexNext3_1 },
  form4: { screen: indexNext4 },
  form5: { screen: indexNext5 },

}, {
  mode: 'modal',
  initialRouteName: 'home',
  transitionConfig: () => fromRight(1000),
})



class AuthLoadingScreen extends Component {
  constructor(props) {
    super(props);
    this._loadData();
  }

  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </View>
    )
  }

  _loadData = async () => {
    const isLoggedIn = await AsyncStorage.getItem('isLoggedIn');
    this.props.navigation.navigate(isLoggedIn !== '1' ? 'Auth' : 'App')
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black'
  }
})

const login = createStackNavigator({
  index: { screen: indexStart },
  login: { screen: indexLogin },
  register: { screen: indexRegister },
  home: { screen: home },
}, {
  initialRouteName: 'index',
  headerMode: 'none',
  transitionConfig: () => fromTop(1000),
})

const authStack = createStackNavigator({
  home: { screen: login },
})


const App = createAppContainer(login);

export default createAppContainer(createSwitchNavigator(
  {
    AuthLoading : AuthLoadingScreen,
    App : home,
    Auth : login,
    Auths : login,
  },
  {
    initialRouteName : 'AuthLoading'
  }
))

