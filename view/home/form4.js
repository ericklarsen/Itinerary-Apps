import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    ActivityIndicator,
    TextInput,
    Alert,
} from 'react-native';
import DateTimePicker from "react-native-modal-datetime-picker";
import NumericInput from 'react-native-numeric-input'
import CurrencyFormatter from "react-native-currency-formatter";
import AsyncStorage from '@react-native-community/async-storage'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isDateTimePickerVisible: false,
            dates: '',
            value: '',
            dataSource: '',
            dataSource2: '',
            isLoading: true,
            id: '',
            pax: this.props.navigation.state.params.pax,
            dates: this.props.navigation.state.params.dates,
            name: this.props.navigation.state.params.name,
            price: this.props.navigation.state.params.price,
            days: this.props.navigation.state.params.days,
            dataForm3_day_temp: this.props.navigation.state.params.dataForm3_day_temp,
            dataForm3_lunch_temp: this.props.navigation.state.params.dataForm3_lunch_temp,
            dataForm3_dinner_temp: this.props.navigation.state.params.dataForm3_dinner_temp,
            dataForm3_eating_temp: this.props.navigation.state.params.dataForm3_eating_temp,
            dataForm3_total_temp: this.props.navigation.state.params.dataForm3_total_temp,
            dataForm2: this.props.navigation.state.params.dataForm2,
            username: ''
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
        headerTintColor: '#f5a21d',
        headerStyle: {
            backgroundColor: '#141212'
        },
        title: 'Itinerary Form'
    }


    async componentDidMount() {
        var url1 = 'https://goldengarudabali.com/goldengarudabali.com/api/view_transport.php'
        var url2 = 'https://goldengarudabali.com/goldengarudabali.com/api/view_itinerary.php'
            try {
                const response1 = await fetch(url1)
                const response2 = await fetch(url2)
                const json1 = await response1.json()
                const json2 = await response2.json()
                this.setState({
                    dataSource: json1,
                    dataSource2: json2,
                    isLoading: false,
    
                })
                console.log(this.state.dataForm3_eating_temp)
            } catch (error) {
                console.log(error);
            }
    }


    toNext = () => {
        // ---------------------- Mencari ID Itinerary ----------------
        var value = Math.random().toString(36).substring(2,9);
        var status = false;
        var id = ''
        if(this.state.dataSource2){
            while (status !== true){
                const indexs = this.state.dataSource2.findIndex(
                    x => x.id_it === value
                    );
                if(indexs === -1){
                    id = value
                    status = true
                }else{
                    value = Math.random().toString(36).substring(2,9);
                }
            }
        }else{
            id = value
        }

        // --------------------------------------------------------------

        // ------------------------- Mencari guide fee ----------------------
        var fee = 1250000;
        var dayextra = 0;
        var bonus = 0;
        var t_free = 0;
        var d_free = 0;
        this.state.dataForm3_day_temp.map((Object, idx) => {
            if(Object.id_ow === '0'){
                t_free = t_free+1
                d_free = parseInt(Object.day_it_tour)
            }
        })
        if (this.state.days >= 4) {
            dayextra = this.state.days - 6
            if(dayextra < 0){
                dayextra = 0
            }
            if(dayextra >= 0 && d_free === 0){
                bonus = dayextra * 50000;
                if(t_free > 0 && d_free > 2){
                    fee = (fee + bonus) - 450000
                }else{
                    fee = fee + bonus
                }
            }else if(dayextra >= 0 && d_free > 0){
                bonus = dayextra * 100000;
                if(t_free > 0 && d_free > 2){
                    fee = (fee + bonus) - 450000
                }else{
                    fee = fee + bonus
                }
            } else{
                fee = fee
            }
            
        } else {    
            fee = 0
        }
        // --------------------------------------------------------------------

        // -------------------------- Mencari Transport Fee -------------------
        var transfee = 0;
        var prices = 0;
        this.state.dataSource.map((Object,idx) => {
            if(Object.min_transport <= parseInt(this.state.pax) && Object.max_transport >= parseInt(this.state.pax)){
                if(this.state.days > 5){
                    prices = (parseInt(Object.price_transport) / 5) * this.state.days
                    transfee = prices / parseInt(this.state.pax)
                }else if(this.state.days <= 5 && this.state.days >= 4){
                    transfee = parseInt(Object.price_transport) / parseInt(this.state.pax)
                }else{
                    transfee = 0
                }

            }
        })
        
        // Alert.alert(String(fee))

        // --------------------------------------------------------------------
        fetch('https://goldengarudabali.com/goldengarudabali.com/api/insert_itinerary_all.php', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username : this.state.username,
                    id_it : id,
                    name_it : this.state.name,
                    date_it : this.state.dates,
                    pax_it : this.state.pax,
                    days_it : this.state.days,
                    price_it : this.state.price,
                    dataForm3_day : this.state.dataForm3_day_temp,
                    dataForm3_dinner : this.state.dataForm3_dinner_temp,
                    dataForm3_lunch : this.state.dataForm3_lunch_temp,
                    dataForm3_eating : this.state.dataForm3_eating_temp,
                    dataForm2 : this.state.dataForm2,
                    guidefee_it : fee,
                    transportfee_it : transfee
                    
                })
            }).then((response) => response.json())
                .then((responseJson) => {
                    // Alert.alert(JSON.stringify(responseJson))                    
                    if (responseJson == 'failed') {
                        Alert.alert('Some data is not correct, please input it again!')
                    } else {
                        this.props.navigation.navigate('form5');
                    }
                }).catch((error) => {
                    console.error(error);
                })
    }

    showDateTimePicker = () => {
        this.setState({ isDateTimePickerVisible: true });
    };

    hideDateTimePicker = () => {
        this.setState({ isDateTimePickerVisible: false });
    };

    handleDatePicked = time => {
        console.log(this.state.dates);
        this.hideDateTimePicker();
    };

    toCheck = (min, max, id, name_id, name_chinese, price) => {
        let prices = 0;

        if (min <= parseInt(this.state.pax) && max >= parseInt(this.state.pax)) {
            if(this.state.days > 5){
                prices = (price / 5) * this.state.days
                return (
                    <View key={index} style={{ marginTop: 20}}>
                        <Text style={{ marginBottom: 10, color: '#f5a21d', fontSize: hp('2%'), fontWeight: 'bold' }}>
                            Transport fee
                    </Text>
                        <View style={{ borderColor: '#f5a21d', borderWidth: 0.5, paddingLeft: 15, paddingVertical: 15, flexDirection: 'column', justifyContent: 'center', }}>
                            <Text style={{ fontSize: hp('2%'), fontWeight: 'bold', color: '#f5a21d' }}>
                                {name_id} | {name_chinese} | {CurrencyFormatter(parseInt(prices) / parseInt(this.state.pax))} / pax
                        </Text>
                        </View>
                    </View>
                )
            }else if(this.state.days <= 5 && this.state.days >= 4){
                return (
                    <View key={index} style={{ marginTop: 20}}>
                        <Text style={{ marginBottom: 10, color: '#f5a21d', fontSize: hp('2%'), fontWeight: 'bold' }}>
                            Transport fee
                    </Text>
                        <View style={{ borderColor: '#f5a21d', borderWidth: 0.5, paddingLeft: 15, paddingVertical: 15, flexDirection: 'column', justifyContent: 'center', }}>
                            <Text style={{ fontSize: hp('2%'), fontWeight: 'bold', color: '#f5a21d' }}>
                                {name_id} | {name_chinese} | {CurrencyFormatter(parseInt(price) / parseInt(this.state.pax))} / pax
                        </Text>
                        </View>
                    </View>
                )
            }else{
                return (
                    <View key={index} style={{ marginTop: 20}}>
                        <Text style={{ marginBottom: 10, color: '#f5a21d', fontSize: hp('2%'), fontWeight: 'bold' }}>
                            Transport fee
                    </Text>
                        <View style={{ borderColor: '#f5a21d', borderWidth: 0.5, paddingLeft: 15, paddingVertical: 15, flexDirection: 'column', justifyContent: 'center', }}>
                            <Text style={{ fontSize: hp('2%'), fontWeight: 'bold', color: '#f5a21d' }}>
                            Will be calculated manually by the agent
                        </Text>
                        </View>
                    </View>
                )
            }

            
        } else {
            return null
        }
    }

    toCheck3 = (Object, idx) =>{
        var prices = 0;
        var fee = 1250000;
        var dayextra = 0;
        var bonus = 0;
        var t_free = 0;
        var d_free = 0;
        this.state.dataForm3_day_temp.map((Object, idx) => {
            if(Object.id_ow === '0'){
                t_free = t_free+1
                d_free = parseInt(Object.day_it_tour)
            }
        })

        if (this.state.days >= 4) {
            dayextra = this.state.days - 6
            if(dayextra < 0){
                dayextra = 0
            }
            if(dayextra >= 0 && d_free === 0){
                bonus = dayextra * 50000;
                if(t_free > 0 && d_free > 2){
                    fee = (fee + bonus) - 450000
                }else{
                    fee = fee + bonus
                }
            } else if(dayextra >= 0 && d_free > 0){
                bonus = dayextra * 100000;
                if(t_free > 0 && d_free > 2){
                    fee = (fee + bonus) - 450000
                }else{
                    fee = fee + bonus
                }
            } else{
                fee = fee + bonus
            }
            
        }else{
            fee = 0
        }

        if (Object.min_transport <= parseInt(this.state.pax) && Object.max_transport >= parseInt(this.state.pax)) {
            if(this.state.days > 5){
                prices = (parseInt(Object.price_transport) / 5) * this.state.days
                return (
                    <View key={idx} style={{ marginTop: 20, marginBottom: 20 }}>
                    <Text style={{ marginBottom: 10, color: '#f5a21d', fontSize: hp('2%'), fontWeight: 'bold' }}>
                    Total Itinerary fee ({this.state.days} days)
                </Text>
                    <View style={{ borderColor: '#f5a21d', borderWidth: 0.5, paddingLeft: 15, paddingVertical: 15, flexDirection: 'column', justifyContent: 'center', }}>
                        <Text style={{ fontSize: hp('2%'), fontWeight: 'bold', color: '#f5a21d' }}>
                            {CurrencyFormatter((parseInt(prices) / parseInt(this.state.pax)) + parseInt(this.state.price) + fee)} / pax (Include Transport)
                    </Text>
                    </View>
                </View>
                )
            }
            else if(this.state.days <= 5 && this.state.days >= 4){
                return (
                    <View key={idx} style={{ marginTop: 20, marginBottom: 20 }}>
                        <Text style={{ marginBottom: 10, color: '#f5a21d', fontSize: hp('2%'), fontWeight: 'bold' }}>
                        Total Itinerary fee ({this.state.days} days)
                    </Text>
                        <View style={{ borderColor: '#f5a21d', borderWidth: 0.5, paddingLeft: 15, paddingVertical: 15, flexDirection: 'column', justifyContent: 'center', }}>
                            <Text style={{ fontSize: hp('2%'), fontWeight: 'bold', color: '#f5a21d' }}>
                                {CurrencyFormatter((parseInt(Object.price_transport) / parseInt(this.state.pax) ) + parseInt(this.state.price) + fee)} / pax (Include Transport)
                        </Text>
                        </View>
                    </View>
                )
            }else{
                return (
                    <View key={idx} style={{ marginTop: 20, marginBottom: 20 }}>
                        <Text style={{ marginBottom: 10, color: '#f5a21d', fontSize: hp('2%'), fontWeight: 'bold' }}>
                        Total Itinerary fee ({this.state.days} days)
                    </Text>
                        <View style={{ borderColor: '#f5a21d', borderWidth: 0.5, paddingLeft: 15, paddingVertical: 15, flexDirection: 'column', justifyContent: 'center', }}>
                            <Text style={{ fontSize: hp('2%'), fontWeight: 'bold', color: '#f5a21d' }}>
                                {CurrencyFormatter(parseInt(this.state.price) + fee)} / pax
                        </Text>
                        </View>
                    </View>
                )
            }
            
        } else {
            return null
        }
    }

    toCheck2 = () => {
        var fee = 1250000;
        var dayextra = 0;
        var bonus = 0;
        var t_free = 0;
        var d_free = 0;
        this.state.dataForm3_day_temp.map((Object, idx) => {
            if(Object.id_ow === '0'){
                t_free = t_free+1
                d_free = parseInt(Object.day_it_tour)
            }
        })
        if (this.state.days >= 4) {
            dayextra = this.state.days - 6
            if(dayextra < 0){
                dayextra = 0
            }
            if(dayextra >= 0 && d_free === 0){
                bonus = dayextra * 50000;
                if(t_free > 0 && d_free > 2){
                    fee = (fee + bonus) - 450000
                    return (
                        <View style={{ marginTop: 20, }}>
                            <Text style={{ marginBottom: 10, color: '#f5a21d', fontSize: hp('2%'), fontWeight: 'bold' }}>
                                Service and tour guide fee
                            </Text>
                            <View style={{ borderColor: '#f5a21d', borderWidth: 0.5, paddingLeft: 15, paddingVertical: 20, flexDirection: 'column', justifyContent: 'center', }}>
                                <Text style={{ fontSize: hp('2%'), color: '#f5a21d' }}>
                                {CurrencyFormatter(fee)} // {this.state.days} days ({t_free} free day) // {this.state.pax} pax
                                </Text>
                            </View>
                        </View>
                    )
                }else{
                    fee = fee + bonus
                return (
                    <View style={{ marginTop: 20, }}>
                        <Text style={{ marginBottom: 10, color: '#f5a21d', fontSize: hp('2%'), fontWeight: 'bold' }}>
                            Service and tour guide fee
                        </Text>
                        <View style={{ borderColor: '#f5a21d', borderWidth: 0.5, paddingLeft: 15, paddingVertical: 20, flexDirection: 'column', justifyContent: 'center', }}>
                            <Text style={{ fontSize: hp('2%'), color: '#f5a21d' }}>
                            {CurrencyFormatter(fee)} //  {this.state.days} days ({t_free} free day) // {this.state.pax} pax
                            </Text>
                        </View>
                    </View>
                )
                }
                
                
            } else if(dayextra >= 0 && d_free > 0){
                bonus = dayextra * 100000;
                if(t_free > 0 && d_free > 2){
                    fee = (fee + bonus) - 450000
                    return (
                        <View style={{ marginTop: 20, }}>
                            <Text style={{ marginBottom: 10, color: '#f5a21d', fontSize: hp('2%'), fontWeight: 'bold' }}>
                                Service and tour guide fee
                            </Text>
                            <View style={{ borderColor: '#f5a21d', borderWidth: 0.5, paddingLeft: 15, paddingVertical: 20, flexDirection: 'column', justifyContent: 'center', }}>
                                <Text style={{ fontSize: hp('2%'), color: '#f5a21d' }}>
                                {CurrencyFormatter(fee)} // {this.state.days} days ({t_free} free day) // {this.state.pax} pax
                                </Text>
                            </View>
                        </View>
                    )
                }else{
                    fee = fee + bonus
                return (
                    <View style={{ marginTop: 20, }}>
                        <Text style={{ marginBottom: 10, color: '#f5a21d', fontSize: hp('2%'), fontWeight: 'bold' }}>
                            Service and tour guide fee
                        </Text>
                        <View style={{ borderColor: '#f5a21d', borderWidth: 0.5, paddingLeft: 15, paddingVertical: 20, flexDirection: 'column', justifyContent: 'center', }}>
                            <Text style={{ fontSize: hp('2%'), color: '#f5a21d' }}>
                            {CurrencyFormatter(fee)} //  {this.state.days} days ({t_free} free day) // {this.state.pax} pax
                            </Text>
                        </View>
                    </View>
                )
                }
                
                
            } else{
                return (
                    <View style={{ marginTop: 20, }}>
                        <Text style={{ marginBottom: 10, color: '#f5a21d', fontSize: hp('2%'), fontWeight: 'bold' }}>
                            Service and tour guide fee
                        </Text>
                        <View style={{ borderColor: '#f5a21d', borderWidth: 0.5, paddingLeft: 15, paddingVertical: 20, flexDirection: 'column', justifyContent: 'center', }}>
                            <Text style={{ fontSize: hp('2%'), color: '#f5a21d' }}>
                            {CurrencyFormatter(fee + bonus)} // {this.state.days} days tour // {this.state.pax} pax
                            </Text>
                        </View>
                    </View>
                )
            }
            
        } else {
            return (
                <View style={{ marginTop: 20, }}>
                    <Text style={{ marginBottom: 10, color: '#f5a21d', fontSize: hp('2%'), fontWeight: 'bold' }}>
                        Service and tour guide fee
            </Text>
                    <View style={{ borderColor: '#f5a21d', borderWidth: 0.5, paddingLeft: 15, paddingVertical: 20, flexDirection: 'column', justifyContent: 'center', }}>
                        <Text style={{ fontSize: hp('2%'), color: '#f5a21d' }}>
                            No tour guide fee
                        </Text>
                    </View>
                </View>
            )
        }
    }

    toRandom = () =>{
        // var value = Math.random().toString(10).substring(2,3);
        // var value = Math.random().toString(36).substring(2,9);
        // var status = false;
        // var id = ''
        // while (status !== true){
        //     const indexs = this.state.dataSource2.findIndex(
        //         x => x.id_it === value
        //         );
        //     if(indexs === -1){
        //         id = value
        //         status = true
        //     }else{
        //         value = Math.random().toString(36).substring(2,9);
        //     }
        // }

        var transfee = 0;
        this.state.dataSource.map((Object,idx) => {
            if(Object.min_transport <= parseInt(this.state.pax) && Object.max_transport >= parseInt(this.state.pax)){
                transfee = parseInt(Object.price_transport) / parseInt(this.state.pax)
            }
        })

        console.log(transfee)
    }



    render() {
        if (this.state.isLoading) {
            return (
                <View style={{ flex: 1, backgroundColor:'black', paddingTop: 20 }}>
                    <ActivityIndicator />
                </View>
            )

        }
        return (
            <View style={{ flex: 1, backgroundColor: '#242121', alignItems: 'center', }}>
                <Image source={require('../../assets/bg.png')} style={{ position: 'absolute', resizeMode: 'contain', }} />
                <View style={{ flex: 2.5, justifyContent: 'center', borderBottomColor: '#f5a21d', borderBottomWidth: 0.5, width: '80%' }}>
                    <Text style={{ color: '#f5a21d', fontSize: hp('4%'), fontWeight: 'bold' }}>
                        Itinerary Fee
                        </Text>
                    <Text style={{ color: '#f5a21d', fontSize: hp('2%'), fontWeight: 'normal', marginTop: 15 }}>
                        Transportation and itinerary fee 
                        </Text>
                </View>
                <View style={{ flex: 10, marginTop: 10, width: '80%' }}>
                    {this.toCheck2()}

                    {this.state.dataSource.map((Object, idx) => (
                        this.toCheck(Object.min_transport, Object.max_transport, Object.id_transport, Object.name_transport_id, Object.name_transport_chinese, Object.price_transport)
                    ))}
                     {this.state.dataSource.map((Object, idx) => (
                        this.toCheck3(Object, idx)
                    ))}

                      

                    {/* <View key={idx} style={{ marginTop: 20, marginBottom: 20 }}>
                        <Text style={{ color: '#f5a21d', fontSize: 16, fontWeight: 'bold' }}>
                            Transport fee {Object.id_transport}
                        </Text>
                        <View style={{marginTop: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Text style={{ fontSize: 17, color: '#f5a21d' }}>
                                    IDR. 1.500.000 / 4 days tour / 20 pax
                            </Text>
                        </View>
                    </View> */}

                    {/* {this.state.dataForm2.map((Object, idx) => (
                        <View key={idx}>
                            <Text style={{ color: '#f5a21d', fontSize: 15, fontWeight: 'normal', marginTop: 15 }}>
                                {Object.name_id} | {Object.price} | {Object.duration}
                            </Text>
                        </View>
                    ))}

                    {this.state.dataForm3_day_temp.map((Object, idx) => (
                        <View key={idx}>
                            <Text style={{ color: '#f5a21d', fontSize: 15, fontWeight: 'normal', marginTop: 15 }}>
                                {Object.day_it_tour} | {Object.id_ow} |
                            </Text>
                        </View>
                    ))} */}


                    <View style={{ alignItems: 'center', width: '100%', marginBottom: 20, bottom: 0, position: 'absolute', justifyContent: 'center', }}>
                        <TouchableOpacity
                            onPress={this.toNext}
                            style={{ width: wp('35%'), height: hp('6%'), borderRadius: 60, backgroundColor: '#f5a21d', justifyContent: 'center', alignItems: 'center', }}>
                            <Text style={{ fontSize: 15, fontWeight: 'bold' }}>
                                Next
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>

            </View>
        )
    }
}

export default index