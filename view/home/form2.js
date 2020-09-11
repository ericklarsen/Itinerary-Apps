import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    TextInput,
    ScrollView,
    Alert
} from 'react-native';
import DateTimePicker from "react-native-modal-datetime-picker";
import NumericInput from 'react-native-numeric-input'
import Icon from 'react-native-vector-icons/Ionicons'
import { SearchBar, } from 'react-native-elements';
import CheckBox from '@react-native-community/checkbox';
import CurrencyFormatter from "react-native-currency-formatter";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isDateTimePickerVisible: false,
            dates: this.props.navigation.state.params.dates,
            day: this.props.navigation.state.params.day,
            month: this.props.navigation.state.params.month,
            pax: this.props.navigation.state.params.pax,
            name: this.props.navigation.state.params.name,
            value: '',
            hotel: [{ id: "", name_id:"", name_chinese:"", duration: "", room: "", price:"", value:false }],
            hotelValue: [{ value:false}],
            searchBar: [{value : false}],
            dataSource: '',
            dataSource2: '',
            dataSelected:'',
            dayData : false,
            text:'',
            totalDay : '1',
            totalDuration: '0',
            total_price : ''
        };
        this.arrayHolder = [];
    }


    static navigationOptions = {
        headerTintColor: '#f5a21d',
        headerStyle: {
            backgroundColor: '#141212'
        },
        title: 'Itinerary Form'
    }
    
    componentDidMount() {
        // var url1 = 'https://goldengarudabali.com/goldengarudabali.com/api/view_hotel.php'
        // var url2 = 'https://goldengarudabali.com/goldengarudabali.com/api/view_hs.php'
        var url1 = 'https://goldengarudabali.com/goldengarudabali.com/api/view_hotel.php'
        var url2 = 'https://goldengarudabali.com/goldengarudabali.com/api/view_hs.php'
        return fetch(url1
            , {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username : 'erick',
                    month : this.state.month,
                    
                })
            }
        ).then((response) => response.json())
            .then((responseJson) => {
                const data = responseJson;
                this.setState({
                    isLoading: false,
                    dataSource: data.map(x => {
                        x['value'] = false;
                        return x;
                    }),
                }, function () {
                    this.arrayHolder = responseJson;
                })
                console.log(this.state.dataSource)
                console.log('---------------------------')

            }).then(() =>{
                fetch(url2).then((response) => response.json())
                .then((responseJson) => {
                    const data2 = responseJson;
                    this.setState({
                        dataSource2: data2
                    }, function () {
                    })
                    console.log('---------------------------')
                    console.log(this.state.dataSource2)
                    console.log('---------------------------')
                })
            }).catch((error) => {
                console.error(error);
            })

    }

    

    updateSearch(text) {
        const dataSelected = this.state.dataSelected;
        const newData = this.arrayHolder.filter(function (item) {
          const itemData = item.name_hotel_id.toLowerCase();
          const textData = text.toLowerCase();
          return itemData.indexOf(textData) > -1;
        });
        this.setState({
          dataSource: newData,
          text: text
        })

        console.log(this.state.hotel)
      };

      cekBox = (id_hotel, name_hotel_id,name_hotel_chinese, price_hotel, value,idx) => {
        const data = this.state.dataSelected;
    
        if (data) {
          const index = this.state.dataSelected.findIndex(
            x => x.id_hotel === id_hotel && x.value
          );
          console.log(index);
          if (index === -1) {
            return (
                <CheckBox
                onValueChange={(value) => this.Updet(id_hotel, name_hotel_id, name_hotel_chinese, price_hotel, value,idx)}
                value={Boolean(value)}
                tintColors={{ true: '#f5a21d', false: '#f5a21d' }}
              />
            )
          } else if (index >= 0) {
            return (
              <View style={{ width: 65, height: 30, backgroundColor: '#ff3131', justifyContent: 'center', alignItems: 'center', }}>
                <Text style={{ fontSize: hp('1.5%'), fontWeight: 'bold', color: 'white' }}>
                  Selected
                </Text>
              </View>
            )
          }
        } else {
          return (
            <CheckBox
              onValueChange={(value) => this.Updet(id_hotel, name_hotel_id, name_hotel_chinese, price_hotel, value,idx)}
              value={Boolean(value)}
              tintColors={{ true: '#f5a21d', false: '#f5a21d' }}
            />
          )
        }
    
      }

      toNameChange = (value, idx) => {
        const newHotel = this.state.hotel.map((Object, sidx) => {
            if (idx !== sidx) return Object;
            return { ...Object, name: value }
        });

        this.setState({ hotel: newHotel })
        console.log(this.state.hotel)

    }

      Updet = (id_hotel, name_hotel_id, name_hotel_chinese, price_hotel, value,idx) => {
        var totalPax = (this.state.pax / 2).toFixed(0);
        if (!value === false) {
          const temp = this.state.dataSelected;
          if (temp) {
            const newHotel = this.state.hotel.map((Object, sidx) => {
                if (idx !== sidx) return Object;
                return { ...Object, id: id_hotel, name_id : name_hotel_id, name_chinese : name_hotel_chinese, price : price_hotel, room :totalPax , value: value}
            });
            this.setState(state => {
              return {
                  dayData : true,
                   text : '',
                dataSelected: [
                  ...state.dataSelected,
                  { id_hotel: id_hotel, name_hotel_id: name_hotel_id,name_hotel_chinese: name_hotel_chinese, price_hotel: price_hotel, value: value },
                ],
                hotel : newHotel,

                total: parseInt(this.state.total) + parseInt(price_hotel),
              };
    
            })
            
          } else {
              
            const newHotel = this.state.hotel.map((Object, sidx) => {
                if (idx !== sidx) return Object;
                return { ...Object, id: id_hotel, name_id : name_hotel_id, name_chinese : name_hotel_chinese, price : price_hotel, room :totalPax , value: value}
            });

            this.setState(state => {
              return {
                dayData : true,
                  text : '',
                dataSelected: [
                  ...state.dataSelected,
                  { id_hotel: id_hotel, name_hotel_id: name_hotel_id,name_hotel_chinese: name_hotel_chinese, price_hotel: price_hotel, value: value },
                ],
                hotel : newHotel,
                total: parseInt(this.state.total) + parseInt(price_hotel),
              };
    
            })
            console.log(this.state.hotel);
            console.log(this.state.hotelValue);
          }
        } else {
          const data = this.state.dataSelected;
          const index = this.state.dataSelected.findIndex(
            x => x.id_hotel === id_hotel
          );
          data.splice(index, 1);
          if (!data) {
            this.setState({
              dataSelected: '',
              text: '',
              total: parseInt(this.state.total) - parseInt(price_hotel),
            })
          } else {
            this.setState({
              dataSelected: data,
              total: parseInt(this.state.total) - parseInt(price_hotel),
            })
          }
          console.log(data)
        }
    
    
      }

      toCheckHs = (Object,idx,idx2) =>{
          if(this.state.dataSource2){
            const indexs = this.state.dataSource2.findIndex(
                x => x.id_hotel === Object.id_hotel
              );
              if(indexs === -1){
                return(
                    <View key={idx} style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 20 }}>
                <View style={{ marginRight: 20, }}>
                    <Icon name='ios-arrow-forward' size={hp('4%')} type='ionicon' color='#f5a21d' />
                </View>
                <View style={{ width: '70%', flexDirection: 'column', justifyContent: 'center' }}>
                    <Text style={{ color: '#f5a21d', fontSize: hp('2.2%'), fontWeight: 'bold', }}>
                        {Object.name_hotel_id} // {Object.name_hotel_chinese} 
                </Text>
                <View style={{marginTop:7,height: 25, width: 100, backgroundColor: '#579A16', justifyContent: 'center', alignItems: 'center',}}>
                    <Text style={{fontSize: hp('1.8%'), color: 'white'}}>
                        Normal
                    </Text>
                </View>
                </View>
    
                <View style={{ justifyContent: 'center' }}>
                {this.cekBox(Object.id_hotel, Object.name_hotel_id, Object.name_hotel_chinese, Object.price_hotel, Object.value,idx2)}
                </View>
                </View>
                )
              }
              else{
                  return(
                    this.state.dataSource2.map((Objects,idxs) => (
                        <View key={idx} style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 20 }}>
                        <View style={{ marginRight: 20, }}>
                            <Icon name='ios-arrow-forward' size={hp('4%')} type='ionicon' color='#f5a21d' />
                        </View>
                        <View style={{ width: '70%', flexDirection: 'column', justifyContent: 'center' }}>
                            <Text style={{ color: '#f5a21d', fontSize: hp('2.2%'), fontWeight: 'bold', }}>
                                {Object.name_hotel_id} // {Object.name_hotel_chinese} 
                        </Text>
                        <View style={{marginTop:7,height: 25, width: 100, backgroundColor: '#C40000', justifyContent: 'center', alignItems: 'center',}}>
                            <Text style={{fontSize: hp('1.8%'), color: 'white'}}>
                                High Season! 
                                {/* {parseInt(Object.price_hotel) + parseInt(Objects.price_hs)} */}
                            </Text>
                        </View>
                        </View>
        
                        <View style={{ justifyContent: 'center' }}>
                        {this.cekBox(Object.id_hotel, Object.name_hotel_id, Object.name_hotel_chinese, parseInt(Object.price_hotel) + parseInt(Objects.price_hs), Object.value,idx2)}
                        </View>
                        </View>
                ))
                  )
              }
          }else{
            return(
                <View key={idx} style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 20 }}>
            <View style={{ marginRight: 20, }}>
                <Icon name='ios-arrow-forward' size={hp('4%')} type='ionicon' color='#f5a21d' />
            </View>
            <View style={{ width: '70%', flexDirection: 'column', justifyContent: 'center' }}>
                <Text style={{ color: '#f5a21d', fontSize: hp('2.2%'), fontWeight: 'bold', }}>
                    {Object.name_hotel_id} // {Object.name_hotel_chinese} 
            </Text>
            <View style={{marginTop:7,height: 25, width: 100, backgroundColor: '#579A16', justifyContent: 'center', alignItems: 'center',}}>
                <Text style={{fontSize: hp('1.8%'), color: 'white'}}>
                    Normal
                </Text>
            </View>
            </View>

            <View style={{ justifyContent: 'center' }}>
            {this.cekBox(Object.id_hotel, Object.name_hotel_id, Object.name_hotel_chinese, Object.price_hotel, Object.value,idx2)}
            </View>
            </View>
            )
          }
        
          
      }


      toCheck = (idx) => {
        if (this.state.dataSelected && !this.state.text) {
            return null
        }
         else if (!this.state.dataSelected && !this.state.text) {
            return (
                <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 20 }}>
                    <Text style={{ color: '#f5a21d', fontSize: hp('2%'), fontWeight: 'bold', }}>
                        No hotel selected
                        </Text>
                </View>
            )
        } else {
            return (
                this.state.dataSource.map((Object, index) => (

                    this.toCheckHs(Object,index,idx)
                    // <View key={index} style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 20 }}>
                    //     <View style={{ marginRight: 20, }}>
                    //         <Icon name='ios-arrow-forward' size={30} type='ionicon' color='#f5a21d' />
                    //     </View>
                    //     <View style={{ width: '70%', flexDirection: 'column', justifyContent: 'center' }}>
                    //         <Text style={{ color: '#f5a21d', fontSize: 18, fontWeight: 'bold', }}>
                    //             {Object.name_hotel_id} // {Object.name_hotel_chinese}
                    //     </Text>
                    //     <View style={{marginTop:7,height: 25, width: 100, backgroundColor: '#C40000', justifyContent: 'center', alignItems: 'center',}}>
                    //         <Text style={{fontSize: 13.5, color: 'white'}}>
                    //             High Season!
                    //         </Text>
                    //     </View>
                    //     </View>

                    //     <View style={{ justifyContent: 'center' }}>
                    //     {this.cekBox(Object.id_hotel, Object.name_hotel_id, Object.name_hotel_chinese, Object.price_hotel, Object.value,idx)}
                    //     </View>
                    // </View>
                ))
            )
        }
    }

    toShow = (id, name_id, name_chinese, price, value, idx) =>{
        if(name_id){
                return(
                    <View key={index} style={{ flexDirection: 'row', paddingLeft:10, borderWidth: 0.5, borderColor:'#f5a21d', justifyContent: 'space-between', alignItems: 'center', marginTop: 20 }}>
                        <View style={{ marginRight: 20, }}>
                            <Icon name='ios-arrow-forward' size={hp('2%')} type='ionicon' color='#f5a21d' />
                        </View>
                        <View style={{ width: '70%', flexDirection: 'column', justifyContent: 'center' }}>
                            <Text style={{ color: '#f5a21d', fontSize: hp('2%'), fontWeight: 'bold', }}>
                                {name_id} // {name_chinese}
                        </Text>
                        </View>

                        <View style={{ justifyContent: 'center' }}>
                        <View style={{ width: 65, height: 30, backgroundColor: '#009040', justifyContent: 'center', alignItems: 'center', }}>
                            <Text style={{ fontSize: hp('1.5%'), fontWeight: 'bold', color: 'white' }}>
                            Selected
                            </Text>
                        </View>
                        </View>
                    </View>
                )
            }else{
                return null
            }
            }

            // toNext = (data) => {
            //     let totals = ''
            //     let price =0
            //     let state = ''
            //     let duration = 0
        
            //     if(this.state.hotel && this.state.dayData){
            //         console.log('-----this hotel ----------')
            //         console.log(this.state.hotel)
            //         console.log(this.state.dayData)
            //     }else{
            //         console.log('----- kosong ----------')
            //         console.log(this.state.hotel)
            //         console.log(this.state.dayData)
            //     }
            // }

    toNext = (data) => {
        let totals = ''
        let price =0
        let state = ''
        let duration = 0

        if(this.state.hotel && this.state.dayData){
            this.state.hotel.map((Object,idx) =>{
                    price = parseInt(price) + ((parseInt(Object.price) / 2) * parseInt(Object.duration))
                })

                this.state.hotel.map((Object,idx) =>{
                    if(Object.duration === ''){
                        state = parseInt(price) + 1
                    }else{
                        state = 0
                    }
                    })

                    this.state.hotel.map((Object,idx) =>{
                        if(Object.duration !== ''){
                            duration = duration + parseInt(Object.duration) 
                        }
                        })
                        console.log('------duration------')
                        console.log(duration)
                        console.log(state)
                        console.log(price)

                    if(state === 0 && duration < this.state.day){
                        this.props.navigation.navigate('form3',{
                            dataForm2 : data,
                            day : '1',
                            days : this.state.day,
                            pax : this.state.pax,
                            dates : this.state.dates,
                            name : this.state.name,
                            dataForm3_day_temp: '',
                            dataForm3_dinner_temp: '',
                            dataForm3_total_temp: '',
                            dataForm3_lunch_temp: '',
                            price : price
                        });
                    }else if(duration === 0){
                        Alert.alert('Please fill the duration')
                    }
                    else{
                        Alert.alert('Duration is greater than days tour')
                    }
                    
        }else{
            // Alert.alert('Failed')
            if(!this.state.dayData){
                this.props.navigation.navigate('form3',{
                    dataForm2 : data,
                    day : '1',
                    days : this.state.day,
                    pax : this.state.pax,
                    dates : this.state.dates,
                    name : this.state.name,
                    dataForm3_day_temp: '',
                    dataForm3_dinner_temp: '',
                    dataForm3_total_temp: '',
                    dataForm3_lunch_temp: '',
                    dataForm3_eating_temp: '',
                    price : price
                });
            }else{
                this.state.hotel.map((Object,idx) =>{
                    if(Object.duration && !Object.id){
                        Alert.alert('Please select the hotel!')
                    }else{
                        this.props.navigation.navigate('form3',{
                            dataForm2 : data,
                            day : '1',
                            days : this.state.day,
                            pax : this.state.pax,
                            dates : this.state.dates,
                            name : this.state.name,
                            dataForm3_day_temp: '',
                            dataForm3_dinner_temp: '',
                            dataForm3_total_temp: '',
                            dataForm3_lunch_temp: '',
                            dataForm3_eating_temp: '',
                            price : price
                        });
                    }
                    })
            }
           
        }
    }

    toAddSelect = () => {
        this.setState({
            hotel: this.state.hotel.concat([{id:"", name: "", duration: "", room: "" }]),
            dayData : false,
        })
        console.log(this.state.hotel)
        console.log(this.state.hotelValue)
    }

    toRemoveSelect = idx => () => {
        this.setState({
            hotel: this.state.hotel.filter((s, sidx) => idx !== sidx),
            dataSelected: this.state.dataSelected.filter((s, sidx) => idx !== sidx),
            dayData : false
        })
        console.log('--------------')
        console.log(this.state.hotel)
    }

    toNameChange = (value, idx) => {
        const newHotel = this.state.hotel.map((Object, sidx) => {
            if (idx !== sidx) return Object;
            return { ...Object, name: value }
        });

        this.setState({ hotel: newHotel })
        // console.log(this.state.hotel)

    }


    toDurationChange = (value, idx) => {
        if(value){
            var totalPax = (this.state.pax / 2).toFixed(0);
            const newHotel = this.state.hotel.map((Object, sidx) => {
                if (idx !== sidx) return Object;
                return { ...Object, duration: value, room:totalPax }
            });
            this.setState({ hotel: newHotel, dayData : true, totalDay : parseInt(this.state.totalDay) + parseInt(value) })
            console.log(this.state.hotel)
        }else{
            var totalPax = (this.state.pax / 2).toFixed(0);
            const newHotel = this.state.hotel.map((Object, sidx) => {
                if (idx !== sidx) return Object;
                return { ...Object, duration: value,dayData : true, room:totalPax  }
            });
            this.setState({ hotel: newHotel})
            console.log(this.state.hotel)
        }
    }

    toRoomChange = (value, idx) => {
        const newHotel = this.state.hotel.map((Object, sidx) => {
            if (idx !== sidx) return Object;
            return { ...Object, room: value }
        });

        this.setState({ hotel: newHotel })
        console.log(this.state.hotel)

    }

    toSearchBar = (data,idx) =>{
        if(!data){
            return(
                <View>
                    <SearchBar
                containerStyle={{
                    backgroundColor: '#1e1e1e', borderWidth: 0.5, borderColor: '#f5a21d', borderTopColor: '#f5a21d',
                    borderBottomColor: '#f5a21d', marginTop: 15
                }}
                inputContainerStyle={{ height: hp('4.5%'), backgroundColor: '#1e1e1e' }}
                inputStyle={{ fontSize: hp('2%'), color: '#f5a21d', backgroundColor: '#1e1e1e' }}
                placeholderTextColor={'#f5a21d'}
                placeholder={'Choose hotel'}
                leftIconContainerStyle={{}}
                value={this.state.text}
                placeholder="Type Here..."
                onChangeText={text => this.updateSearch(text)}
                />
                
                {this.toCheck(idx)}
                </View>
                )

        }
        else{
            return null
        }
                
    }

    toPrice = (price, duration, pax) =>{
        // var totalPax = (pax / 2).toFixed(0);
        if(price){
            return(
                <View style={{ flexDirection: 'row', marginTop: 20, height: 50, backgroundColor: '#f5a21d', justifyContent: 'center', alignItems: 'center' }}>
                                    <Icon name='ios-cash' size={25} type='ionicon' color='#1A1818' />
                                    <Text style={{marginLeft:10, color: '#1A1818', fontSize: 20, fontWeight: 'bold' }}>
                                    {CurrencyFormatter(parseInt((price / 2) * duration))}
                                    </Text>
                                </View>
            )
        }else{
            return(
            <View style={{ flexDirection: 'row', marginTop: 20, height: 50, backgroundColor: '#f5a21d', justifyContent: 'center', alignItems: 'center' }}>
                                    <Icon name='ios-cash' size={25} type='ionicon' color='#1A1818' />
                                    <Text style={{marginLeft:10, color: '#1A1818', fontSize: 20, fontWeight: 'bold' }}>
                                    Price
                                    </Text>
                                </View>
            )}
    }

    toBtnDelete = (idx) =>{
        if(this.state.dataSelected){
            return (
                <TouchableOpacity style={{flexDirection:'row', alignItems:'center'}} onPress={this.toRemoveSelect(idx)}>
                                    <Text style={{ color: '#fd3600', fontSize: hp('1.7%'), fontWeight: 'bold' ,marginRight:5}}>
                                       Delete
                                    </Text>
                                        <Icon name='ios-close' size={hp('2.5%')} type='ionicon' color='#fd3600' />
                                    </TouchableOpacity>
            )
        }else{
            return null
        }
    }

    render() {
        var totalPax = (this.state.pax / 2).toFixed(0);
        return (
            <View style={{ flex: 1, backgroundColor: '#242121', alignItems: 'center', justifyContent: 'center', }}>
                <Image source={require('../../assets/bg.png')} style={{ position: 'absolute', resizeMode: 'contain' }} />
                {/* <Image source={require('../../assets/logo1.png')} style={{ position: 'absolute', resizeMode: 'contain',width: 300, opacity:0.15 }} /> */}
                <View style={{ flex: 2.5, justifyContent: 'center', borderBottomColor: '#f5a21d', borderBottomWidth: 0.5, width: '80%', }}>
                    <Text style={{ color: '#f5a21d', fontSize: hp('4%'), fontWeight: 'bold' }}>
                        Hotel
                        </Text>
                    <Text style={{ color: '#f5a21d', fontSize: hp('2%'), fontWeight: 'normal', marginTop: 15 }}>
                        Choose hotel, duration and total rooms
                        </Text>
                </View>

                <View style={{ flex: 10, width: '80%' }}>
                    <ScrollView style={{ height: '60%' }}>
                        {this.state.hotel.map((Object, idx) => (

                            <View key={idx} style={{ justifyContent: 'center',paddingVertical:30, borderBottomColor: '#f5a21d', borderBottomWidth: 0.5, }}>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <Text style={{ color: '#f5a21d', fontSize: hp('2%'), fontWeight: 'bold' }}>
                                        Select hotel #{idx + 1}
                                    </Text>
                                    {this.toBtnDelete(idx)}
                                </View>

                                {this.toSearchBar(Object.value, idx)}
                                
                                {/* {this.toCheck(idx)} */}

                                {this.toShow(Object.id, Object.name_id, Object.name_chinese, Object.price, true, idx)}

                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <View>
                                        <Text style={{ color: '#f5a21d', fontSize: hp('2%'), fontWeight: 'bold', marginTop: 20 }}>
                                            Duration #{idx + 1} 
                                        </Text>
                                        <TextInput
                                            keyboardType='numeric'
                                            placeholderTextColor="#f5a21d"
                                            value={Object.duration}
                                            placeholder='Nights'
                                            onChangeText={TextInputValue => this.toDurationChange(TextInputValue, idx)}
                                            style={{ color: '#f5a21d', paddingHorizontal: 20, width: wp('38%'), height: hp('6%'), justifyContent: 'center', alignItems: 'center', borderWidth: 0.5, borderColor: '#f5a21d', marginTop: 10 }}
                                        />
                                    </View>

                                    <View>
                                        <Text style={{ color: '#f5a21d', fontSize: hp('2%'), fontWeight: 'bold', marginTop: 20 }}>
                                            Rooms #{idx + 1}
                                        </Text>
                                        <View
                                            style={{ color: '#f5a21d', paddingHorizontal: 20, width: wp('38%'), height: hp('6%'), justifyContent: 'center', alignItems: 'center', borderWidth: 0.5, borderColor: '#f5a21d', marginTop: 10 }}
                                        >
                                            <Text style={{ color: '#f5a21d', fontSize: hp('2%'), fontWeight: 'bold'}}>
                                            {totalPax} room(s)
                                        </Text>
                                            </View>
                                    </View>
                                </View>
                                {/* {this.toPrice(Object.price, Object.duration, totalPax)} */}
                            </View>
                        ))}
                        
                    </ScrollView>
                    {/* ------------------------------- */}


                    <View 
                    style={{ marginVertical: 30, alignItems: 'center', flexDirection: 'row', 
                    justifyContent: 'space-between',  }}>
                        <View style={{ flexDirection: 'row' }}>
                            <TouchableOpacity
                                onPress={this.toAddSelect}
                                style={{ width: hp('6%'), height: hp('6%'), borderRadius: 60, backgroundColor: '#f5a21d', justifyContent: 'center', alignItems: 'center', }}>
                                <Text style={{ fontSize: hp('3%'), fontWeight: 'bold' }}>
                                    +
                            </Text>
                            </TouchableOpacity>
                        </View>

                        <View>
                            <TouchableOpacity
                                onPress={this.toNext.bind(this, this.state.hotel)}
                                style={{ width: wp('25%'), height: hp('6%'), borderRadius: 60, backgroundColor: '#f5a21d', justifyContent: 'center', alignItems: 'center', }}>
                                <Text style={{ fontSize: hp('2%'), fontWeight: 'bold' }}>
                                    Next
                            </Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* ////////////////////////////// */}

                    
                </View>
            </View>
        )
    }
}

export default index