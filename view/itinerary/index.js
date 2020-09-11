import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    ActivityIndicator,
    YellowBox,
    Linking,
    Alert,
    LogBox
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'
import { ScrollView } from 'react-native-gesture-handler';
import moment from 'moment'
import CurrencyFormatter from "react-native-currency-formatter";
import AsyncStorage from '@react-native-community/async-storage'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';



class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            dataSource: '',
            // username : this.props.navigation.state.params.username
        };
        this.arrayHolder = [];

        // AsyncStorage.getItem('username', (error, result) => {
        //     if (result) {
        //         this.setState({
        //             username: result
        //         });
        //     }
        // });
    }
    static navigationOptions = {
        header: null
    }
    toForm = () => {
        // this.props.navigation.navigate('form1');
    }

    toItinerary = () => {
        this.props.navigation.navigate('itinerary');
    }

    toHome = () => {
        this.props.navigation.navigate('home');
    }

    toAccount = () => {
        this.props.navigation.navigate('account');
    }

    toDetail = (id_it) => {
        this.props.navigation.navigate('itineraryDetail', {
            id_it: id_it
        });
    }

    componentDidMount() {
        AsyncStorage.getItem('username', (error, result) => {
            if (result) {

                var url1 = 'https://goldengarudabali.com/goldengarudabali.com/api/view_itinerary_all.php'
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
                            // username: 'erick',

                        })
                    }
                ).then((response) => response.json())
                    .then((responseJson) => {
                        const data = responseJson;
                        this.setState({
                            isLoading: false,
                            dataSource: data
                        }, function () {
                            this.arrayHolder = responseJson;
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
    toDelete = (id) => {
        fetch('https://goldengarudabali.com/goldengarudabali.com/api/delete_itinerary.php', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id_it: id,
            })
        }).then((response) => response.json())
            .then((responseJson) => {
                if (responseJson == 'failed') {
                    Alert.alert('ID Not Found!')
                } else {
                    this.props.navigation.replace('itinerary')
                }
            }).catch((error) => {
                console.error(error);
            })
    }

    toShow = () => {
        if (this.state.dataSource) {
            return (
                <View style={{ flex: 8 }}>
                    <ScrollView style={{ height: '80%' }}>
                        {this.state.dataSource.map((Object, idx) => (
                            <View key={idx} style={{ width: wp('100%'), height: hp('22%'), marginBottom: 70, alignItems: 'center' }}>

                                <View style={{
                                    width: '80%', height: '75%', borderColor: '#f5a21d', borderWidth: 1, borderTopRightRadius: 20,

                                }}>
                                    <View style={{
                                        borderBottomColor: '#f5a21d', borderBottomWidth: 1, width: '100%',
                                        height: '52%', borderTopRightRadius: 20, flexDirection: 'row', alignItems: 'center',
                                    }}>

                                        <View style={{
                                            borderRightColor: '#f5a21d', borderRightWidth: 1,
                                            justifyContent: 'center', paddingLeft: 10, width: '37%', height: '100%',
                                        }}>
                                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                <Icon name='ios-calendar' size={hp('2%')} type='ionicon' color='#f5a21d' />
                                                <Text style={{ marginLeft: 5, color: '#f5a21d', fontSize: hp('1.7%'), }}>
                                                    Date of tour
                                    </Text>
                                            </View>
                                            <View style={{
                                                marginTop: 8, justifyContent: 'center',
                                                alignItems: 'center', height: hp('3.8%'), width: wp('25%'), backgroundColor: '#579A16'
                                            }}>
                                                <Text style={{ color: 'white', fontSize: hp('2%'), fontWeight: 'bold' }}>
                                                    {moment(Object.date_it).format('DD MMM YYYY')}
                                                </Text>
                                            </View>
                                        </View>

                                        <View style={{ marginLeft: 15, width: '45%' }}>
                                            <Text style={{ color: '#f5a21d', fontSize: hp('2.5%'), fontWeight: 'bold' }}>
                                                {Object.name_it}
                                            </Text>
                                            <View style={{ flexDirection: 'row', marginTop: 4 }}>
                                                <Text style={{ color: '#f5a21d', fontSize: hp('1.7%'), }}>
                                                    {Object.pax_it} pax, {Object.days_it} days tour
                                </Text>
                                            </View>
                                        </View>
                                        <TouchableOpacity
                                            onPress={this.toDelete.bind(this, Object.id_it)}
                                            style={{
                                                backgroundColor: '#f5a21d', borderRightWidth: 1, borderTopRightRadius: 20,
                                                justifyContent: 'center', width: '14%', height: '100%', alignItems: 'center',
                                            }}>
                                            <Icon name='ios-trash' size={hp('3.4%')} type='ionicon' color='black' />
                                        </TouchableOpacity>

                                    </View>

                                    <View style={{
                                        width: '100%', height: '48%', justifyContent: 'space-between',
                                        paddingLeft: 20, paddingRight: 20, alignItems: 'center', flexDirection: 'row',
                                    }}>
                                        <View style={{flexDirection: 'row', justifyContent:'space-between', alignItems: 'center'}}>
                                        <Icon name='ios-cash' size={hp('3%')} type='ionicon' color='#f5a21d' />
                                            <Text style={{marginLeft: 8, color: '#f5a21d', fontWeight:'bold', fontSize: hp('2%'), }}>
                                                Price :
                                            </Text>
                                        </View>
                                        <View>
                                        <Text style={{ color: '#f5a21d', fontSize: hp('2.3%'), fontWeight: 'bold' }}>
                                                {CurrencyFormatter(parseInt(Object.price_it) + parseInt(Object.transportfee_it) + parseInt(Object.guidefee_it))} / pax
                            </Text>
                                        </View>
                                        {/* <View>
                                            <Text style={{ color: '#f5a21d', fontSize: hp('1.7%'), }}>
                                                Guide fee
                            </Text>
                                            <Text style={{ color: '#f5a21d', fontSize: hp('2%'), fontWeight: 'bold' }}>
                                                {CurrencyFormatter(parseInt(Object.guidefee_it))}
                                            </Text>
                                        </View> */}
                                    </View>


                                </View>
                                <TouchableOpacity
                                    onPress={() => { Linking.openURL('https://goldengarudabali.com/goldengarudabali.com/api/download.php?id_it=' + Object.id_it) }}
                                    style={{
                                        marginTop: 5, width: '80%', height: '20%', backgroundColor: '#C40000',
                                        justifyContent: 'center', alignItems: 'center', flexDirection: 'row',
                                    }}>
                                    <Icon name='ios-download' size={hp('2.5%')} type='ionicon' color='white' />
                                    <Text style={{ marginLeft: 6, color: 'white', fontSize: hp('1.8%'), fontWeight: 'bold' }}>
                                        Download as PDF
                            </Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={this.toDetail.bind(this, Object.id_it)}
                                    style={{
                                        marginTop: 5, width: '80%', height: '20%', backgroundColor: '#579A16',
                                        justifyContent: 'center', alignItems: 'center', flexDirection: 'row',
                                    }}>
                                    <Icon name='ios-search' size={hp('2.5%')} type='ionicon' color='white' />
                                    <Text style={{ marginLeft: 6, color: 'white', fontSize: hp('1.8%'), fontWeight: 'bold' }}>
                                        See detail
                            </Text>
                                </TouchableOpacity>
                            </View>
                        ))}
                    </ScrollView>
                </View>
            )
        } else {
            return (
                <View style={{ flex: 8, justifyContent: 'center', alignItems: 'center', }}>
                    <View style={{ width: '100%', flex: 8, marginBottom: 40, alignItems: 'center', justifyContent: 'center' }}>
                        <Image source={require('../../assets/icon.png')} style={{ position: 'absolute', resizeMode: 'contain', height: hp('55%') }} />

                    </View>
                    <View style={{ width: '100%', flex: 1, marginBottom: 40, alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{ color: '#f5a21d', fontSize: hp('2.4%'), fontWeight: 'bold', marginBottom: 5 }}>
                            Let's create!
                            </Text>
                        <TouchableOpacity
                            onPress={this.toForm}
                            style={{
                                marginTop: 5, width: '50%', height: '80%', backgroundColor: '#C40000',
                                justifyContent: 'center', alignItems: 'center', flexDirection: 'row',
                            }}>
                            <Icon name='ios-create' size={hp('2%')} type='ionicon' color='white' />
                            <Text style={{ marginLeft: 6, color: 'white', fontSize: hp('1.8%'), fontWeight: 'bold' }}>
                                Create Itinerary
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )
        }
    }

    render() {
        YellowBox.ignoreWarnings([
            'Warning: componentWillReceiveProps',
        ]);
        if (this.state.isLoading) {
            return (
                <View style={{ flex: 1 }}>
                    <Image source={require('../../assets/bg.png')} style={{ position: 'absolute', resizeMode: 'contain', }} />
                    <View style={{ flex: 2.5, justifyContent: 'center' }}>

                        <View style={{ justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center', paddingHorizontal: 30 }}>
                            <View style={{ justifyContent: 'center', }}>
                                <Image source={require('../../assets/logo1.png')} style={{ position: 'absolute', resizeMode: 'contain', width: 50 }} />
                                {/* <Icon name='ios-flower' size={55} type='ionicon' color='#f5a21d' /> */}
                            </View>

                            <View style={{ alignItems: 'flex-end' }}>
                                <Text style={{ color: '#f5a21d', fontSize: hp('3.5%'), fontWeight: 'bold' }}>
                                    Itinerary List
                                </Text>
                                <Text style={{ marginTop: 5, color: '#f5a21d', marginBottom: 15, fontSize: hp('1.7%') }}>
                                    All travel plans that have been made
                                </Text>
                            </View>

                        </View>
                        <View style={{ marginTop: 10, borderBottomColor: '#f5a21d', borderBottomWidth: 0.8 }}></View>
                    </View>
                    <View style={{ flex: 8, justifyContent: 'center', alignItems: 'center', }}>
                        <Text style={{ fontSize: 15, color: '#f5a21d', marginBottom: 10, fontWeight: 'bold' }}>
                            Load data...
                    </Text>
                        <ActivityIndicator />

                    </View>
                    <View style={{ flex: 1.1, backgroundColor: '#141212', flexDirection: 'row' }}>
                        <TouchableOpacity
                            onPress={this.toHome}
                            style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}>
                            <Icon name='ios-home' size={25} type='ionicon' color='#f5a21d' />
                            <Text style={{ fontSize: 12, color: '#f5a21d', }}>
                                Home
                        </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={this.toItinerary}
                            style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}>
                            <Icon name='ios-today' size={25} type='ionicon' color='#f5a21d' />
                            <Text style={{ fontSize: 12, color: '#f5a21d', }}>
                                Itinerary
                        </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={this.toItinerary}
                            style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}>
                            <Icon name='ios-person' size={25} type='ionicon' color='#f5a21d' />
                            <Text style={{ fontSize: 12, color: '#f5a21d', }}>
                                Account
                        </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )

        }
        return (
            <View style={{ flex: 1, backgroundColor: '#242121', }}>
                <Image source={require('../../assets/bg.png')} style={{ position: 'absolute', resizeMode: 'contain', }} />

                <View style={{ flex: 2.5, justifyContent: 'center' }}>

                    <View style={{ justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center', paddingHorizontal: 30 }}>
                        <View style={{ justifyContent: 'center', }}>
                            <Image source={require('../../assets/logo1.png')} style={{ position: 'absolute', resizeMode: 'contain', width: wp('12%') }} />
                            {/* <Icon name='ios-flower' size={55} type='ionicon' color='#f5a21d' /> */}
                        </View>

                        <View style={{ alignItems: 'flex-end' }}>
                            <Text style={{ color: '#f5a21d', fontSize: hp('3.5%'), fontWeight: 'bold' }}>
                                Itinerary List
                                </Text>
                            <Text style={{ marginTop: 5, color: '#f5a21d', marginBottom: 15, fontSize: hp('1.7%') }}>
                                All travel plans that have been made
                                </Text>
                        </View>

                    </View>
                    <View style={{ marginTop: 10, borderBottomColor: '#f5a21d', borderBottomWidth: 0.8 }}></View>
                </View>



                {this.toShow()}

                <View style={{ flex: 1.1, backgroundColor: '#141212', flexDirection: 'row' }}>
                    <TouchableOpacity
                        onPress={this.toHome}
                        style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}>
                        <Icon name='ios-home' size={hp('3%')} type='ionicon' color='#f5a21d' />
                        <Text style={{ fontSize: hp('1.5%'), color: '#f5a21d', }}>
                            Home
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={this.toItinerary}
                        style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}>
                        <Icon name='ios-today' size={hp('3%')} type='ionicon' color='#f5a21d' />
                        <Text style={{ fontSize: hp('1.5%'), color: '#f5a21d', }}>
                            Itinerary
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={this.toAccount}
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