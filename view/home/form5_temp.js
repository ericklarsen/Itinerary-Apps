import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    TextInput
} from 'react-native';
import DateTimePicker from "react-native-modal-datetime-picker";
import NumericInput from 'react-native-numeric-input'
import { ScrollView } from 'react-native-gesture-handler';

class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isDateTimePickerVisible: false,
            dates: '',
            value: '',
        };
    }


    static navigationOptions = {
        headerLeft: null,
        headerTintColor: '#f5a21d',
        headerStyle: {
            backgroundColor: '#141212'
        },
        title: 'Result'
    }


    toNext = () => {
        this.props.navigation.navigate('form2');
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

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: '#242121', alignItems: 'center', }}>
                <Image source={require('../../assets/bg.png')} style={{ position: 'absolute', resizeMode: 'contain', }} />
                <View style={{ flex: 2.5, justifyContent: 'center', borderBottomColor: '#f5a21d', borderBottomWidth: 0.5, width: '80%' }}>
                    <Text style={{ color: '#f5a21d', fontSize: 28, fontWeight: 'bold' }}>
                        Success!
                        </Text>
                    <Text style={{ color: '#f5a21d', fontSize: 15, fontWeight: 'normal', marginTop: 15 }}>
                        Itinerary has been created
                        </Text>
                </View>

                <View style={{ flex: 10, width: '80%' }}>
                    <ScrollView>
                        <View style={{ height: 80, paddingBottom: 15, alignItems: 'center', flexDirection: 'row', marginTop: 20, justifyContent: 'space-between', borderBottomColor: '#f5a21d', borderBottomWidth: 0.5 }}>
                            <View>
                                <Text style={{ color: '#f5a21d', fontSize: 20, fontWeight: 'bold' }}>
                                    Date of tour
                        </Text>
                                <View style={{ marginTop: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <Text style={{ fontSize: 16, color: '#f5a21d' }}>
                                        Wednesday, 27 December 2019
                            </Text>
                                </View>
                            </View>
                        </View>

                        <View style={{ height: 80, paddingBottom: 15, alignItems: 'center', flexDirection: 'row', marginTop: 20, justifyContent: 'space-between', borderBottomColor: '#f5a21d', borderBottomWidth: 0.5 }}>
                            <View>
                                <Text style={{ color: '#f5a21d', fontSize: 16, fontWeight: 'bold' }}>
                                    Duration
                        </Text>
                                <View style={{ marginTop: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <Text style={{ fontSize: 14, color: '#f5a21d' }}>
                                        5 days
                            </Text>
                                </View>
                            </View>

                            <View>
                                <Text style={{ color: '#f5a21d', fontSize: 16, fontWeight: 'bold' }}>
                                    Total pax
                        </Text>
                                <View style={{ marginTop: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <Text style={{ fontSize: 14, color: '#f5a21d' }}>
                                        20 pax
                            </Text>
                                </View>
                            </View>
                        </View>

                        <View style={{ paddingBottom: 15, alignItems: 'center', flexDirection: 'row', marginTop: 20, justifyContent: 'space-between', borderBottomColor: '#f5a21d', borderBottomWidth: 0.5 }}>
                            <View>
                                <Text style={{ color: '#f5a21d', fontSize: 16, fontWeight: 'bold' }}>
                                    Hotel List
                                </Text>
                                <View style={{ marginTop: 10, flexDirection: 'column', justifyContent: 'center',}}>
                                    <Text style={{ fontSize: 14, color: '#f5a21d' }}>
                                        1. Swissbel Hotel / 2 days / 15 room(s)
                                </Text>
                                <Text style={{marginTop:5, fontSize: 14, fontWeight: 'bold', color: '#f5a21d' }}>
                                        Price : IDR. 10.000.000
                                </Text>
                                </View>
                                <View style={{ marginTop: 10, flexDirection: 'column', justifyContent: 'center',}}>
                                    <Text style={{ fontSize: 14, color: '#f5a21d' }}>
                                        2. Rangga Hotel / 2 days / 15 room(s)
                                </Text>
                                <Text style={{marginTop:5, fontSize: 14, fontWeight: 'bold', color: '#f5a21d' }}>
                                        Price : IDR. 12.000.000
                                </Text>
                                </View>
                                <View style={{ marginTop: 10, flexDirection: 'column', justifyContent: 'center',}}>
                                    <Text style={{ fontSize: 14, color: '#f5a21d' }}>
                                        3. Darmawangsa / 1 days / 15 room(s)
                                </Text>
                                <Text style={{marginTop:5, fontSize: 14, fontWeight: 'bold', color: '#f5a21d' }}>
                                        Price : IDR. 15.000.000
                                </Text>
                                </View>
                            </View>

                        </View>

                        <View style={{ paddingBottom: 15, alignItems: 'center', flexDirection: 'row', marginTop: 20, justifyContent: 'space-between', borderBottomColor: '#f5a21d', borderBottomWidth: 0.5 }}>
                            <View>
                                <Text style={{ color: '#f5a21d', fontSize: 16, fontWeight: 'bold' }}>
                                    Tour List
                                </Text>
                                <View style={{ marginTop: 10, flexDirection: 'column', justifyContent: 'center',}}>
                                    <Text style={{fontWeight:'bold', fontSize: 16, color: '#f5a21d' }}>
                                        Day 1
                                </Text>
                                <Text style={{ fontSize: 14, color: '#f5a21d' }}>
                                        - Utu
                                </Text>
                                <Text style={{marginTop:5, fontSize: 14, fontWeight: 'bold', color: '#f5a21d' }}>
                                        Price : IDR. 10.000.000
                                </Text>
                                </View>
                                <View style={{ marginTop: 10, flexDirection: 'column', justifyContent: 'center',}}>
                                    <Text style={{fontWeight:'bold',  fontSize: 16, color: '#f5a21d' }}>
                                        Day 2
                                </Text>
                                <Text style={{ fontSize: 14, color: '#f5a21d' }}>
                                        - Utu
                                </Text>
                                <Text style={{marginTop:5, fontSize: 14, fontWeight: 'bold', color: '#f5a21d' }}>
                                        Price : IDR. 10.000.000
                                </Text>
                                </View>
                            </View>

                        </View>

                    </ScrollView>

                    <View style={{ marginTop: 20, marginBottom: 30, alignItems: 'center' }}>
                        <TouchableOpacity
                            onPress={this.toNext}
                            style={{ width: 180, height: 45, borderRadius: 60, backgroundColor: '#f5a21d', justifyContent: 'center', alignItems: 'center', }}>
                            <Text style={{ fontSize: 15, fontWeight: 'bold' }}>
                                Back to home
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>

            </View>
        )
    }
}

export default index