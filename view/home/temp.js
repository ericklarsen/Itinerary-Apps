import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    TextInput,
    ScrollView
} from 'react-native';
import DateTimePicker from "react-native-modal-datetime-picker";
import NumericInput from 'react-native-numeric-input'

class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isDateTimePickerVisible: false,
            dates: '',
            value: '',
            show: false,
            showBtn: true
        };
    }


    static navigationOptions = {
        headerTintColor: '#f5a21d',
        headerStyle: {
            backgroundColor: '#141212'
        },
        title: 'Itinerary Form'
    }


    toLogin = () => {
        this.props.navigation.navigate('login');
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

    toShow2 = () => {
        return (
            <View style={{ flex: 10, marginTop: 10, width: '80%' }}>
                <View style={{ marginTop: 20, marginBottom: 40 }}>
                    <Text style={{ color: '#f5a21d', fontSize: 16, fontWeight: 'bold' }}>
                        Select hotel #1
                        </Text>
                    <TextInput
                        keyboardType='numeric'
                        placeholderTextColor="#f5a21d"
                        placeholder='Hotel'
                        onChangeText={TextInputValue => this.setState({ fullname: TextInputValue })}
                        style={{ color: '#f5a21d', paddingHorizontal: 20, width: '100%', height: 40, justifyContent: 'center', alignItems: 'center', borderWidth: 0.5, borderColor: '#f5a21d', marginTop: 10 }}
                    />

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <View>
                            <Text style={{ color: '#f5a21d', fontSize: 16, fontWeight: 'bold', marginTop: 20 }}>
                                Duration #1
                                </Text>
                            <TextInput
                                keyboardType='numeric'
                                placeholderTextColor="#f5a21d"
                                placeholder='Day'
                                onChangeText={TextInputValue => this.setState({ fullname: TextInputValue })}
                                style={{ color: '#f5a21d', paddingHorizontal: 20, width: 150, height: 40, justifyContent: 'center', alignItems: 'center', borderWidth: 0.5, borderColor: '#f5a21d', marginTop: 10 }}
                            />
                        </View>

                        <View>
                            <Text style={{ color: '#f5a21d', fontSize: 16, fontWeight: 'bold', marginTop: 20 }}>
                                Rooms #1
                                </Text>
                            <TextInput
                                keyboardType='numeric'
                                placeholderTextColor="#f5a21d"
                                placeholder='Room'
                                onChangeText={TextInputValue => this.setState({ fullname: TextInputValue })}
                                style={{ color: '#f5a21d', paddingHorizontal: 20, width: 150, height: 40, justifyContent: 'center', alignItems: 'center', borderWidth: 0.5, borderColor: '#f5a21d', marginTop: 10 }}
                            />
                        </View>
                    </View>
                </View>


                <View style={{ alignItems: 'center' }}>
                    <TouchableOpacity style={{ width: 180, height: 45, borderRadius: 60, backgroundColor: '#f5a21d', justifyContent: 'center', alignItems: 'center', }}>
                        <Text style={{ fontSize: 15, fontWeight: 'bold' }}>
                            Next
                    </Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    toShows = () =>{
        this.setState({ showBtn: false, show:true })
    }

    toShow1 = () => {
        if (this.state.show) {
            for (let i = 0; i < 3; i++) {
                return (
                    <View style={{ flex: 10, marginTop: 10, width: '80%' }}>
                        <View style={{ marginTop: 20, marginBottom: 40 }}>
                            <Text style={{ color: '#f5a21d', fontSize: 16, fontWeight: 'bold' }}>
                                Select hotel #1 {i}
                                </Text>
                            <TextInput
                                keyboardType='numeric'
                                placeholderTextColor="#f5a21d"
                                placeholder='Hotel'
                                onChangeText={TextInputValue => this.setState({ fullname: TextInputValue })}
                                style={{ color: '#f5a21d', paddingHorizontal: 20, width: '100%', height: 40, justifyContent: 'center', alignItems: 'center', borderWidth: 0.5, borderColor: '#f5a21d', marginTop: 10 }}
                            />

                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                <View>
                                    <Text style={{ color: '#f5a21d', fontSize: 16, fontWeight: 'bold', marginTop: 20 }}>
                                        Duration #1
                                        </Text>
                                    <TextInput
                                        keyboardType='numeric'
                                        placeholderTextColor="#f5a21d"
                                        placeholder='Day'
                                        onChangeText={TextInputValue => this.setState({ fullname: TextInputValue })}
                                        style={{ color: '#f5a21d', paddingHorizontal: 20, width: 150, height: 40, justifyContent: 'center', alignItems: 'center', borderWidth: 0.5, borderColor: '#f5a21d', marginTop: 10 }}
                                    />
                                </View>

                                <View>
                                    <Text style={{ color: '#f5a21d', fontSize: 16, fontWeight: 'bold', marginTop: 20 }}>
                                        Rooms #1
                                        </Text>
                                    <TextInput
                                        keyboardType='numeric'
                                        placeholderTextColor="#f5a21d"
                                        placeholder='Room'
                                        onChangeText={TextInputValue => this.setState({ fullname: TextInputValue })}
                                        style={{ color: '#f5a21d', paddingHorizontal: 20, width: 150, height: 40, justifyContent: 'center', alignItems: 'center', borderWidth: 0.5, borderColor: '#f5a21d', marginTop: 10 }}
                                    />
                                </View>
                            </View>
                        </View>


                        <View style={{ alignItems: 'center' }}>
                            <TouchableOpacity style={{ width: 180, height: 45, borderRadius: 60, backgroundColor: '#f5a21d', justifyContent: 'center', alignItems: 'center', }}>
                                <Text style={{ fontSize: 15, fontWeight: 'bold' }}>
                                    Next | {this.state.value}
                            </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )
            }
        }else{
            return null
        }
    }

    toShowBtn = () => {
        if (this.state.showBtn) {
            return (
                <View style={{ flex: 10, marginTop: 10, width: '80%' }}>
                    <View style={{ marginTop: 20, marginBottom: 40 }}>
                        <Text style={{ color: '#f5a21d', fontSize: 16, fontWeight: 'bold' }}>
                            Total Hotel
                        </Text>
                        <TextInput
                            keyboardType='numeric'
                            placeholderTextColor="#f5a21d"
                            placeholder='Total'
                            onChangeText={TextInputValue => this.setState({ value: TextInputValue })}
                            style={{ color: '#f5a21d', paddingHorizontal: 20, width: '100%', height: 40, justifyContent: 'center', alignItems: 'center', borderWidth: 0.5, borderColor: '#f5a21d', marginTop: 10 }}
                        />
                    </View>
                    <View style={{ alignItems: 'center' }}>
                        <TouchableOpacity
                            onPress={()=>this.toShows()}
                            style={{ width: 180, height: 45, borderRadius: 60, backgroundColor: '#f5a21d', justifyContent: 'center', alignItems: 'center', }}>
                            <Text style={{ fontSize: 15, fontWeight: 'bold' }}>
                                Next | {this.state.value}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>

            )
        } else {
            return null
        }

    }

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: '#242121', alignItems: 'center', }}>
                <Image source={require('../../assets/bg.png')} style={{ position: 'absolute', resizeMode: 'contain', }} />
                <View style={{ flex: 2.5, justifyContent: 'center', borderBottomColor: '#f5a21d', borderBottomWidth: 0.5, width: '80%' }}>
                    <Text style={{ color: '#f5a21d', fontSize: 28, fontWeight: 'bold' }}>
                        Form #2
                        </Text>
                    <Text style={{ color: '#f5a21d', fontSize: 14, fontWeight: 'normal', marginTop: 15 }}>
                        Choose hotel, duration and total rooms
                        </Text>
                </View>
                {this.toShowBtn()}
                {this.toShow1()}
            </View>
        )
    }
}

export default index