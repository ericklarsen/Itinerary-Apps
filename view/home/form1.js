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
import DateTimePicker from "react-native-modal-datetime-picker";
import NumericInput from 'react-native-numeric-input'
import AsyncStorage from '@react-native-community/async-storage'
import moment from 'moment'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';


class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isDateTimePickerVisible: false,
            value: '',
            dates: '',
            day: '',
            pax: '',
            name: '',
            username : ''
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
        title: 'Itinerary Form',
    }


    toNext = (dates, day, pax, month) => {
        if (dates && day && pax && this.state.name) {
            this.props.navigation.navigate('form2', {
                dates: dates,
                day: day,
                pax: pax,
                month: month,
                name: this.state.name
            });
        } else {
            Alert.alert('Please fill the form with correctly!')
        }

    }

    showDateTimePicker = () => {
        this.setState({ isDateTimePickerVisible: true });
    };

    hideDateTimePicker = () => {
        this.setState({ isDateTimePickerVisible: false });
    };

    handleDatePicked = date => {
        this.setState({
            dates: moment(date).format('YYYY-MM-DD'),
            dates2: moment(date).format('DD MMMM YYYY'),
        });
        console.log(this.state.dates);
        this.hideDateTimePicker();
    };

    render() {
        YellowBox.ignoreWarnings([
            'Warning: DatePickerAndroid',
        ]);
        var month = moment(this.state.dates).format('MM')
        return (
            <View style={{ flex: 1, backgroundColor: '#242121', alignItems: 'center', }}>
                <Image source={require('../../assets/bg.png')} style={{ position: 'absolute', resizeMode: 'contain', }} />
                <View style={{ flex: 2.5, justifyContent: 'center', borderBottomColor: '#f5a21d', borderBottomWidth: 0.5, width: '80%' }}>
                    <Text style={{ color: '#f5a21d', fontSize: hp('4%'), fontWeight: 'bold' }}>
                        Tour Detail
                        </Text>
                    <Text style={{ color: '#f5a21d', fontSize: hp('2%'), fontWeight: 'normal', marginTop: 15 }}>
                        Choose date, total day of tour and total pax
                        </Text>
                </View>
                <View style={{ flex: 10, marginTop: 10, width: '80%' }}>
                    <View style={{ marginTop: 20, marginBottom: 40 }}>
                        <Text style={{ color: '#f5a21d', fontSize: hp('2%'), fontWeight: 'bold' }}>
                            Itinerary name
                        </Text>
                        <TextInput
                            placeholderTextColor="#f5a21d"
                            placeholder='Name'
                            onChangeText={TextInputValue => this.setState({ name: TextInputValue })}
                            style={{ color: '#f5a21d', paddingHorizontal: 20, width: '100%', height: hp('6%'), justifyContent: 'center', alignItems: 'center', borderWidth: 0.5, borderColor: '#f5a21d', marginTop: 10 }}
                        />

                        <Text style={{ marginTop: 20, color: '#f5a21d', fontSize: hp('2%'), fontWeight: 'bold' }}>
                            Date of tour
                        </Text>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                            <TouchableOpacity
                                onPress={this.showDateTimePicker}
                                style={{ marginTop: 10, width: wp('38%'), height: hp('6%'), backgroundColor: '#f5a21d', justifyContent: 'center', alignItems: 'center', }}>
                                <Text style={{ fontSize: hp('2%'), color: 'black', fontWeight: 'bold' }}>
                                    Choose date
                            </Text>
                            </TouchableOpacity>
                            <View style={{ marginTop: 10, width: wp('38%'), height: hp('6%'), borderWidth: 0.5, borderColor: '#f5a21d', justifyContent: 'center', alignItems: 'center', }}>
                                <Text style={{ fontSize: hp('1.7%'), color: '#f5a21d' }}>
                                    {this.state.dates2}
                                </Text>
                            </View>
                        </View>

                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                            <View>
                                <Text style={{ color: '#f5a21d', fontSize: hp('2%'), fontWeight: 'bold', marginTop: 20 }}>
                                    Total day of tour
                                </Text>
                                <TextInput
                                    keyboardType='numeric'
                                    placeholderTextColor="#f5a21d"
                                    placeholder='Day'
                                    onChangeText={TextInputValue => this.setState({ day: TextInputValue })}
                                    style={{ color: '#f5a21d', paddingHorizontal: 20, width: wp('38%'), height: hp('6%'), justifyContent: 'center', alignItems: 'center', borderWidth: 0.6, borderColor: '#f5a21d', marginTop: 10 }}
                                />
                            </View>

                            <View>
                                <Text style={{ color: '#f5a21d', fontSize: hp('2%'), fontWeight: 'bold', marginTop: 20 }}>
                                    Total pax
                                </Text>
                                <TextInput
                                    keyboardType='numeric'
                                    placeholderTextColor="#f5a21d"
                                    placeholder='pax'
                                    onChangeText={TextInputValue => this.setState({ pax: TextInputValue })}
                                    style={{ color: '#f5a21d', paddingHorizontal: 20, width: wp('38%'), height: hp('6%'), justifyContent: 'center', alignItems: 'center', borderWidth: 0.5, borderColor: '#f5a21d', marginTop: 10 }}
                                />
                            </View>
                        </View>



                        <DateTimePicker
                            isVisible={this.state.isDateTimePickerVisible}
                            onConfirm={this.handleDatePicked}
                            onCancel={this.hideDateTimePicker}
                            mode="date"
                            format="YYYY-MM-DD"
                        />

                    </View>
                    <View style={{ alignItems: 'center' }}>
                        <TouchableOpacity
                            onPress={this.toNext.bind(this, this.state.dates, this.state.day, this.state.pax, month)}
                            style={{ width: wp('38%'), height: hp('6%'), borderRadius: 60, backgroundColor: '#f5a21d', justifyContent: 'center', alignItems: 'center', }}>
                            <Text style={{ fontSize: hp('2%'), fontWeight: 'bold' }}>
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