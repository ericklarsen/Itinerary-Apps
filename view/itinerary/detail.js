import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    ActivityIndicator,
    YellowBox,
    TextInput,
    LogBox,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'
import AsyncStorage from '@react-native-community/async-storage'
import { Avatar, Snackbar } from 'react-native-paper';
import moment from 'moment'
import { ScrollView } from 'react-native-gesture-handler';
import CurrencyFormatter from 'react-native-currency-formatter';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';


class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            username: '',
            // username: 'erick',
            password: '',
            email: '',
            phone: '',
            dataSource: '',
            dataSource2: '',
            dataSource3: '',
            dataSource4: '',
            dataSource5: '',
            id_it: this.props.navigation.state.params.id_it,
            // id_it: 'w9qutou',
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

    // async componentDidMount() {
    //     var url1 = 'https://goldengarudabali.com/goldengarudabali.com/api/view_itinerary_id.php'
    //     var url2 = 'https://goldengarudabali.com/goldengarudabali.com/api/view_itinerary_tour_id.php'
    //     var url3 = 'https://goldengarudabali.com/goldengarudabali.com/api/view_itinerary_eating_id.php'
    //     var url4 = 'https://goldengarudabali.com/goldengarudabali.com/api/view_itinerary_hotel_id.php'
    //     var url5 = 'https://goldengarudabali.com/goldengarudabali.com/api/view_itinerary_tour_id_day.php'
    //     // var url2 = 'https://goldengarudabali.com/goldengarudabali.com/api/view_hs.php'
    //     return fetch(url1
    //         , {
    //             method: 'POST',
    //             headers: {
    //                 'Accept': 'application/json',
    //                 'Content-Type': 'application/json'
    //             },
    //             body: JSON.stringify({
    //                 id_it: this.state.id_it,

    //             })
    //         }
    //     ).then((response) => response.json())
    //         .then((responseJson) => {
    //             const data = responseJson;
    //             this.setState({
    //                 dataSource: data
    //             }, function () {
    //             })

    //         }).then(() => {
    //             fetch(url2
    //                 , {
    //                     method: 'POST',
    //                     headers: {
    //                         'Accept': 'application/json',
    //                         'Content-Type': 'application/json'
    //                     },
    //                     body: JSON.stringify({
    //                         id_it: this.state.id_it,

    //                     })
    //                 }).then((response) => response.json())
    //                 .then((responseJson) => {
    //                     const data2 = responseJson;
    //                     this.setState({
    //                         dataSource2: responseJson
    //                     }, function () {
    //                     })
    //                 })
    //         }).then(() => {
    //             fetch(url3
    //                 , {
    //                     method: 'POST',
    //                     headers: {
    //                         'Accept': 'application/json',
    //                         'Content-Type': 'application/json'
    //                     },
    //                     body: JSON.stringify({
    //                         id_it: this.state.id_it,

    //                     })
    //                 }).then((response) => response.json())
    //                 .then((responseJson) => {
    //                     const data3 = responseJson;
    //                     this.setState({
    //                         dataSource3: responseJson
    //                     }, function () {
    //                     })
    //                 })
    //         }).then(() => {
    //             fetch(url4
    //                 , {
    //                     method: 'POST',
    //                     headers: {
    //                         'Accept': 'application/json',
    //                         'Content-Type': 'application/json'
    //                     },
    //                     body: JSON.stringify({
    //                         id_it: this.state.id_it,

    //                     })
    //                 }).then((response) => response.json())
    //                 .then((responseJson) => {
    //                     const data4 = responseJson;
    //                     this.setState({
    //                         dataSource4: responseJson
    //                     }, function () {
    //                     })
    //                 })
    //         }).then(() => {
    //             fetch(url5
    //                 , {
    //                     method: 'POST',
    //                     headers: {
    //                         'Accept': 'application/json',
    //                         'Content-Type': 'application/json'
    //                     },
    //                     body: JSON.stringify({
    //                         id_it: this.state.id_it,

    //                     })
    //                 }).then((response) => response.json())
    //                 .then((responseJson) => {
    //                     const data = responseJson;
    //                     // if(this.state.dataSource && this.state.dataSource2 && this.state.dataSource3 && this.state.dataSource4){
    //                         this.setState({
    //                             isLoading: false,
    //                             dataSource5: responseJson
    //                         }, function () {
    //                         })
    //                     // } 
    //                     console.log(this.state.dataSource)
    //                     console.log('---------------------------')
    //                     console.log(this.state.dataSource2)
    //                     console.log('---------------------------')
    //                     console.log(this.state.dataSource3)
    //                     console.log('---------------------------')
    //                     console.log(this.state.dataSource4)
    //                     console.log('---------------------------')
    //                     console.log(this.state.dataSource5)
    //                     console.log('---------------------------')
    //                 })
    //         }).catch((error) => {
    //             console.error(error);
    //         })
    // }

    async componentDidMount() {
        try {
            const response1 = await fetch('https://goldengarudabali.com/goldengarudabali.com/api/view_itinerary_id.php/?id_it='+this.state.id_it)
            const response2 = await fetch('https://goldengarudabali.com/goldengarudabali.com/api/view_itinerary_tour_id.php/?id_it='+this.state.id_it)
            const response3 = await fetch('https://goldengarudabali.com/goldengarudabali.com/api/view_itinerary_eating_id.php/?id_it='+this.state.id_it)
            const response4 = await fetch('https://goldengarudabali.com/goldengarudabali.com/api/view_itinerary_hotel_id.php/?id_it='+this.state.id_it)
            const response5 = await fetch('https://goldengarudabali.com/goldengarudabali.com/api/view_itinerary_tour_id_day.php/?id_it='+this.state.id_it)
            const json1 = await response1.json()
            const json2 = await response2.json()
            const json3 = await response3.json()
            const json4 = await response4.json()
            const json5 = await response5.json()
            this.setState({
                dataSource: json1,
                dataSource2: json2,
                dataSource3: json3,
                dataSource4: json4,
                dataSource5: json5,
                isLoading: false,
            })

            console.log(this.state.dataSource)
            console.log('---------------------------')
            console.log(this.state.dataSource2)
            console.log('---------------------------')
            console.log(this.state.dataSource3)
            console.log('---------------------------')
            console.log(this.state.dataSource4)
            console.log('---------------------------')
            console.log(this.state.dataSource5)
            console.log('---------------------------')
        } catch (error) {
            console.log(error);
        }
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
        this.props.navigation.navigate('itinerary');
    }

    toShowPrice = (Object) => {
        if (Object.transportfee_it === '0') {
            return (
                <View style={{ marginTop: 15 }}>
                    <Text style={{ color: '#f5a21d', fontSize: hp('1.8%'), fontStyle: 'italic' }}>
                        Itinerary price (no include transport)
                     </Text>
                    <Text style={{ marginTop: 3, color: '#f5a21d', fontSize: hp('3%'), fontWeight: 'bold' }}>
                        {CurrencyFormatter(parseInt(Object.price_it) + parseInt(Object.guidefee_it) )}
                    </Text>
                    <Text style={{ color: '#f5a21d', fontSize: hp('1.5%'), marginTop: 5, }}>
                        Transport fee will be calculated manually by the agent later.
                     </Text>
                </View>
            )
        } else {
            return (
                <View style={{ marginTop: 15 }}>
                    <Text style={{ color: '#f5a21d', fontSize: hp('2%'), fontStyle: 'italic' }}>
                        Itinerary price (include transport)
                     </Text>
                    <Text style={{ marginTop: 3, color: '#f5a21d', fontSize: hp('3%'), fontWeight: 'bold' }}>
                        {CurrencyFormatter(parseInt(Object.price_it) + parseInt(Object.transportfee_it) + parseInt(Object.guidefee_it) )}
                    </Text>
                </View>
            )
        }
    }

    toShowDay = (Object, Object2, idx) => {
        if (Object.day_it_tour === Object2.day_it_tour) {
            if (Object2.include_ow_id) {
                return (
                    <Text key={idx} style={{ marginRight: 3, color: '#f5a21d', fontSize: hp('2%') }}>
                        {Object2.name_ow_id} -
                    </Text>
                )
            } else {
                return (
                    <Text key={idx} style={{ marginRight: 3, color: '#f5a21d', fontSize: hp('2%') }}>
                        {Object2.name_ow_id} -
                    </Text>
                )
            }
        } else {
            return null
        }
    }

    toShowActivity = (Object, Object2, idx) => {
        if (Object.day_it_tour === Object2.day_it_tour) {
            if (Object2.include_ow_id) {
                return (
                    <View key={idx}>
                        <Text style={{ marginRight: 3, color: '#f5a21d', fontSize: hp('2%'), fontStyle: 'italic' }}>
                            * {Object2.name_ow_id} ({Object2.include_ow_id})
                    </Text>
                        <Text style={{ marginRight: 3, color: '#f5a21d', fontSize: hp('2%'), fontStyle: 'italic' }}>
                            {Object2.name_ow_chinese} ({Object2.include_ow_chinese})
                    </Text>
                    </View>
                )
            } else {
                return null
            }
        } else {
            return null
        }
    }

    toShowDayChinese = (Object, Object2, idx) => {
        if (Object.day_it_tour === Object2.day_it_tour) {
            if (Object2.include_ow_id) {
                return (
                    <Text key={idx} style={{ marginRight: 3, color: '#f5a21d', fontSize: hp('2%') }}>
                        {Object2.name_ow_chinese}
                    </Text>
                )
            } else {
                return (
                    <Text key={idx} style={{ marginRight: 3, color: '#f5a21d', fontSize: hp('2%') }}>
                        {Object2.name_ow_chinese} -
                    </Text>
                )
            }

        } else {
            return null
        }
    }

    toShowLunch = (Object, Object2, idx) => {
        if (Object2) {
            if (Object.day_it_tour === Object2.day_it_eating) {
                return (
                    <View key={idx} >
                        <Text style={{ marginRight: 3, color: '#f5a21d', fontSize: hp('2%') }}>
                            Lunch : {Object2.name_lunch_id} ({Object2.name_lunch_chinese})
                        </Text>
                        <Text style={{ marginRight: 3, color: '#f5a21d', fontSize: hp('2%') }}>
                            Dinner : {Object2.name_dinner_id} ({Object2.name_dinner_chinese})
                        </Text>
                    </View>
                )
            } else {
                return null
            }
        } else {
            return null
        }

    }

    toCheckLunch = (Object) => {
        if (this.state.dataSource3) {
            return (
                this.state.dataSource3.map((Object2, idx2) => (
                    this.toShowLunch(Object, Object2, idx2)
                ))
            )

        } else {
            return (
                <View >
                    <Text style={{ marginRight: 3, color: '#f5a21d', fontSize: hp('2%') }}>
                        No lunch and dinner
                        </Text>
                </View>
            )
        }
    }

    toCheckHotel = (Object) => {
        if (this.state.dataSource4) {
            return (
                this.state.dataSource4.map((Object2, idx2) => (
                    <View key={idx2} style={{}}>
                        <Text style={{ marginTop: 5, color: '#f5a21d', fontSize: hp('2%'), }}>
                            - {Object2.name_hotel_id} - {Object2.duration_it_hotel} night's - {(Object.pax_it / 2).toFixed(0)} room's
            </Text>
                    </View>
                ))
            )

        } else {
            return (
                <View >
                    <Text style={{ marginRight: 3, color: '#f5a21d', fontSize: hp('2%') }}>
                        - No hotel
                        </Text>
                </View>
            )
        }
    }


    // toShowHotel = () =>{
    //     return(

    //     )
    // }

    render() {
        YellowBox.ignoreWarnings([
            'Warning: componentWillReceiveProps',
        ]);
        var temp = 0;
        if (this.state.isLoading) {
            return (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#242121', }}>
                    <Image source={require('../../assets/bg.png')} style={{ position: 'absolute', resizeMode: 'contain', }} />
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
                                <Icon name='ios-arrow-back' size={hp('4%')} type='ionicon' color='#f5a21d' />

                            </TouchableOpacity>

                            <Text style={{ marginLeft: 20, color: '#f5a21d', fontSize: hp('4%'), fontWeight: 'bold' }}>
                                Detail
                                </Text>

                        </View>
                        <ScrollView style={{ marginBottom: 20 }}>
                            {this.state.dataSource.map((Object, idx) => (

                                <View key={idx} >
                                    <View style={{ marginHorizontal: 30, marginTop: 20, justifyContent: 'center', }} >
                                        <View style={{}}>
                                            <Text style={{ color: '#f5a21d', fontSize: hp('2%'), fontStyle: 'italic' }}>
                                                Tour name
                                        </Text>
                                            <Text style={{ marginTop: 3, color: '#f5a21d', fontSize: hp('3%'), fontWeight: 'bold' }}>
                                                {Object.name_it}
                                            </Text>
                                        </View>
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
                                            <View style={{ marginTop: 15 }}>
                                                <Text style={{ color: '#f5a21d', fontSize: hp('2%'), fontStyle: 'italic' }}>
                                                    Date
                                                </Text>
                                                <Text style={{ marginTop: 3, color: '#f5a21d', fontSize: hp('2%'), fontWeight: 'bold' }}>
                                                    {moment(Object.date_it).format('dddd, DD MMM YYYY')}
                                                </Text>
                                            </View>
                                            <View style={{ marginTop: 15 }}>
                                                <Text style={{ color: '#f5a21d', fontSize: hp('2%'), fontStyle: 'italic' }}>
                                                    Total pax
                                            </Text>
                                                <Text style={{ marginTop: 3, color: '#f5a21d', fontSize: hp('2%'), fontWeight: 'bold' }}>
                                                    {Object.pax_it} pax
                                                </Text>
                                            </View>

                                            <View style={{ marginTop: 15 }}>
                                                <Text style={{ color: '#f5a21d', fontSize: hp('2%'), fontStyle: 'italic' }}>
                                                    Total days
                                            </Text>
                                                <Text style={{ marginTop: 3, color: '#f5a21d', fontSize: hp('2%'), fontWeight: 'bold' }}>
                                                    {Object.days_it} days
                                             </Text>
                                            </View>
                                        </View>
                                    </View>


                                    <View style={{
                                        marginLeft: 30, marginTop: 25, marginBottom: 20, borderBottomColor: '#f5a21d', borderBottomWidth: 0.5
                                    }}>

                                    </View>

                                    <View style={{ marginHorizontal: 30, justifyContent: 'center', }} >
                                        <View style={{}}>
                                            <Text style={{ marginTop: 3, color: '#f5a21d', fontSize: hp('3.3%'), fontWeight: 'bold' }}>
                                                Total
                                        </Text>
                                        </View>
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
                                            {this.toShowPrice(Object)}
                                        </View>
                                    </View>

                                    <View style={{
                                        marginLeft: 30, marginTop: 25, marginBottom: 20, borderBottomColor: '#f5a21d', borderBottomWidth: 0.5
                                    }}>

                                    </View>

                                    <View style={{ marginHorizontal: 30, justifyContent: 'center', }} >
                                        <View style={{}}>
                                            <Text style={{ marginTop: 3, color: '#f5a21d', fontSize: hp('3.3%'), fontWeight: 'bold' }}>
                                                Itinerary
                                        </Text>
                                        </View>
                                        <View style={{}}>
                                            <View style={{ marginTop: 15 }}>
                                                <Text style={{ marginTop: 3, color: '#f5a21d', fontSize: hp('2.5%'), fontWeight: 'bold' }}>
                                                    1. Hotel
                                                </Text>
                                            </View>
                                            {this.toCheckHotel(Object)}

                                            <View style={{ marginTop: 25 }}>
                                                <Text style={{ marginTop: 3, color: '#f5a21d', fontSize: hp('2.5%'), fontWeight: 'bold' }}>
                                                    2. Tour
                                        </Text>

                                                {this.state.dataSource5.map((Object, idx) => (
                                                    <ScrollView
                                                        style={{ width: '100%', }}
                                                        key={idx}
                                                        horizontal={true}
                                                    >
                                                        <View style={{ marginBottom: 10, width: '100%' }}>

                                                            <Text style={{ marginTop: 3, color: '#f5a21d', fontSize: hp('2.5%'), fontWeight: 'bold' }}>
                                                                Day {Object.day_it_tour}
                                                            </Text>
                                                            <View style={{ marginTop: 3, flexDirection: 'row', }}>

                                                                {this.state.dataSource2.map((Object2, idx2) => (

                                                                    this.toShowDay(Object, Object2, idx2)
                                                                ))}

                                                            </View>
                                                            <View style={{ marginTop: 3, flexDirection: 'row' }}>

                                                                {this.state.dataSource2.map((Object2, idx2) => (

                                                                    this.toShowDayChinese(Object, Object2, idx2)
                                                                ))}
                                                            </View>
                                                            <View style={{ marginTop: 3, flexDirection: 'row' }}>

                                                                {this.toCheckLunch(Object)}
                                                            </View>
                                                            <View style={{ marginTop: 3, }}>
                                                                <Text style={{ marginTop: 3, color: '#f5a21d', fontSize: hp('2%'), fontWeight: 'bold' }}>
                                                                    (Activity)
                                                            </Text>
                                                                {this.state.dataSource2.map((Object2, idx2) => (
                                                                    this.toShowActivity(Object, Object2, idx2)
                                                                ))}
                                                            </View>
                                                        </View>
                                                    </ScrollView>
                                                ))}
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            ))}

                        </ScrollView>

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