import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    TextInput,
    Animated
} from 'react-native';
import DateTimePicker from "react-native-modal-datetime-picker";
import NumericInput from 'react-native-numeric-input'
import { ScrollView } from 'react-native-gesture-handler';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

class ImageLoader extends Component {
    state ={
        opacity : new Animated.Value(0)
    }
    
    onLoad = () => {
        Animated.timing(this.state.opacity, {
            toValue : 1,
            duration : 500,
            useNativeDriver: true,
        }).start();
    }

    render() {
        return(
            <Animated.Image 
                onLoad = {this.onLoad}
                {...this.props}
                style = {[
                    {
                        opacity : this.state.opacity,
                        transform : [
                            {
                                scale : this.state.opacity.interpolate({
                                    inputRange: [0,1],
                                    outputRange : [0.85, 1]
                                })
                            }
                        ]
                    },
                    this.props.style,
                ]}
                />
        )
    }
}


class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isDateTimePickerVisible: false,
            dates: '',
            value: '',
            opacity : new Animated.Value(0)
        };
    }


    static navigationOptions = {
        headerLeft: null,
        headerTintColor: '#f5a21d',
        headerStyle: {
            backgroundColor: '#141212'
        },
        headerMode: 'none',
        title: 'Result'
    }

    onLoad = () => {
        Animated.timing(this.state.opacity, {
            toValue : 1,
            duration : 500,
            useNativeDriver: true,
        }).start();
    }


    toNext = () => {
        this.props.navigation.navigate('home');
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
            <View style={{ flex: 1, backgroundColor: '#242121', alignItems: 'center', justifyContent : 'center' }}>
                <Image source={require('../../assets/bg.png')} style={{ position: 'absolute', resizeMode: 'contain', }} />
                <ImageLoader
                source={require('../../assets/success.png')} style={{ position: 'relative', flex: 3, resizeMode: 'contain', width: wp('80%') }} />
                <View style={{ flex:1}}>
                    <Text style={{ marginBottom: 10, color: '#f5a21d', fontSize: hp('2.1%'), fontWeight: 'bold' }}>
                        " Itinerary has been created! "
            </Text>
            <View style={{ alignItems:'center'}}>
            <TouchableOpacity
                    onPress = {this.toNext}
                    style={{borderRadius: 40,paddingVertical: 12, width: wp('50%'),justifyContent: 'center', alignItems :'center', backgroundColor: '#f5a21d' }}>
                        <Text style={{ fontSize: hp('2.1%'), color: 'black', fontWeight: 'bold' }}>
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