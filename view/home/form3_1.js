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
import { SearchBar, } from 'react-native-elements';
import CheckBox from '@react-native-community/checkbox';
import CurrencyFormatter from "react-native-currency-formatter";
import Icon from 'react-native-vector-icons/Ionicons'
import { State } from 'react-native-gesture-handler';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDateTimePickerVisible: false,
      value: '',
      dataForm3_day: '',
      dataForm3_lunch: '',
      dataForm3_dinner: '',
      dataForm3_total: '',
      dataForm3_day_temp: this.props.navigation.state.params.dataForm3_day_temp,
      dataForm3_lunch_temp: this.props.navigation.state.params.dataForm3_lunch_temp,
      dataForm3_dinner_temp: this.props.navigation.state.params.dataForm3_dinner_temp,
      dataForm3_total_temp: this.props.navigation.state.params.dataForm3_total_temp,
      dataForm3_eating_temp: this.props.navigation.state.params.dataForm3_eating_temp,
      name: this.props.navigation.state.params.name,
      price: this.props.navigation.state.params.price,
      count: 1,
      dataSelectd: false,
      text: '',
      text2: '',
      text3: '',
      freeDay: false,
      dataSource: this.props.navigation.state.params.dataSource,
      dataSource2: '',
      dataSource3: '',
      dataSource_new: '',
      dataSelected: this.props.navigation.state.params.dataSelected,
      dataSelected_temp_freeday: this.props.navigation.state.params.dataSelected,
      dataSelected2: '',
      dataSelected3: '',
      dataSelected_temp: '',
      total: '0',
      dataForm2: this.props.navigation.state.params.dataForm2,
      days: this.props.navigation.state.params.days,
      dates: this.props.navigation.state.params.dates,
      day: this.props.navigation.state.params.day,
      pax: this.props.navigation.state.params.pax,
      dataForm3_eating: [{ id_lunch: '0', id_dinner: '0', day_it_eating: '' }],
      data_day: false,
      data_lunch: false,
      data_dinner: false
    };
    this.arrayHolder = this.state.dataSource;
    this.arrayHolder2 = [];
    this.arrayHolder3 = [];
  }


  static navigationOptions = {
    headerTintColor: '#f5a21d',
    headerStyle: {
      backgroundColor: '#141212'
    },
    title: 'Itinerary Form'
  }



  async componentDidMount() {
    var url1 = 'https://goldengarudabali.com/goldengarudabali.com/api/view_tourpackage.php'
    var url2 = 'https://goldengarudabali.com/goldengarudabali.com/api/view_lunch.php'
    var url3 = 'https://goldengarudabali.com/goldengarudabali.com/api/view_dinner.php'
    // var url1 = 'https://goldengarudabali.com/goldengarudabali.com/api/view_tourpackage.php'
    // var url2 = 'https://goldengarudabali.com/goldengarudabali.com/api/view_lunch.php'
    // var url3 = 'https://goldengarudabali.com/goldengarudabali.com/api/view_dinner.php'
    return fetch(url2).then((response) => response.json())
      .then((responseJson) => {
        const data2 = responseJson;
        this.setState({
          dataSource2: data2.map(x => {
            x['value'] = false;
            return x;
          }),
          dataForm3_day: this.state.dataForm3_day_temp,
          dataForm3_lunch: this.state.dataForm3_lunch_temp,
          dataForm3_dinner: this.state.dataForm3_dinner_temp,
          dataForm3_total: this.state.dataForm3_total_temp,
        }, function () {
          this.arrayHolder2 = responseJson;
        })
      }).then(() => {
        fetch(url3).then((response) => response.json())
          .then((responseJson) => {
            const data3 = responseJson;
            this.setState({
              dataSource3: data3.map(x => {
                x['value'] = false;
                return x;
              }),

            }, function () {
              this.arrayHolder3 = responseJson;
            })
            // console.log('')
            // console.log('----------DayForm2-------------')
            // console.log(this.state.dataForm2)
            // console.log('')
            console.log('------------------------------')
            console.log('----------DayForm3_Day----------')
            console.log(this.state.dataForm3_day_temp)
            // console.log('----------DayForm3_Eating----------')
            // console.log(this.state.dataForm3_eating_temp)
            // console.log('')
            // console.log('----------------------------------')
          })
      })
      .catch((error) => {
        console.error(error);
      })

  }

  toNext = (data) => {
    const datas = [...this.state.dataForm3_eating_temp, ...this.state.dataForm3_eating];
    let price = parseFloat(this.state.price) + parseFloat(this.state.total)
    var value = '';
    if (!this.state.dataSelected2 && !this.state.dataSelected3) {
      value = [{ id_lunch: '0', id_dinner: '0', day_it_eating: this.state.day }];
      const datas2 = [...this.state.dataForm3_eating_temp, ...value];
      // Alert.alert('Success!')
      // console.log(datas2)
      if (this.state.freeDay ) {
        this.props.navigation.push('form3_1', {
          dataForm2: data,
          dates: this.state.dates,
          pax: this.state.pax,
          price: price,
          days: this.state.days,
          name: this.state.name,
          dataForm3_day_temp: this.state.dataForm3_day,
          dataForm3_lunch_temp: this.state.dataForm3_lunch,
          dataForm3_dinner_temp: this.state.dataForm3_dinner,
          dataForm3_eating_temp: datas2,
          dataForm3_total_temp: this.state.dataForm3_total,
          dataSource: this.arrayHolder,
          dataSelected: this.state.dataSelected,
          day: parseInt(this.state.day) + 1
        });
      } else if (this.state.data_day && this.state.dataSelected_temp.length > 0) {
        this.props.navigation.push('form3_1', {
          dataForm2: data,
          dates: this.state.dates,
          pax: this.state.pax,
          days: this.state.days,
          name: this.state.name,
          price: price,
          dataForm3_day_temp: this.state.dataForm3_day,
          dataForm3_lunch_temp: this.state.dataForm3_lunch,
          dataForm3_dinner_temp: this.state.dataForm3_dinner,
          dataForm3_eating_temp: datas2,
          dataForm3_total_temp: this.state.dataForm3_total,
          dataSource: this.arrayHolder,
          dataSelected: this.state.dataSelected,
          day: parseInt(this.state.day) + 1
        });
      } else {
        Alert.alert('Please select the tour place!')
      }

    } else {
      // Alert.alert('failed!')
      if (this.state.freeDay) {
        this.props.navigation.push('form3_1', {
          dataForm2: data,
          dates: this.state.dates,
          pax: this.state.pax,
          price: price,
          days: this.state.days,
          name: this.state.name,
          dataForm3_day_temp: this.state.dataForm3_day,
          dataForm3_lunch_temp: this.state.dataForm3_lunch,
          dataForm3_dinner_temp: this.state.dataForm3_dinner,
          dataForm3_eating_temp: datas,
          dataForm3_total_temp: this.state.dataForm3_total,
          dataSource: this.arrayHolder,
          dataSelected: this.state.dataSelected,
          day: parseInt(this.state.day) + 1
        });
      } else if (this.state.data_day && this.state.dataSelected_temp.length > 0) {
        this.props.navigation.push('form3_1', {
          dataForm2: data,
          dates: this.state.dates,
          pax: this.state.pax,
          days: this.state.days,
          name: this.state.name,
          price: price,
          dataForm3_day_temp: this.state.dataForm3_day,
          dataForm3_lunch_temp: this.state.dataForm3_lunch,
          dataForm3_dinner_temp: this.state.dataForm3_dinner,
          dataForm3_eating_temp: datas,
          dataForm3_total_temp: this.state.dataForm3_total,
          dataSource: this.arrayHolder,
          dataSelected: this.state.dataSelected,
          day: parseInt(this.state.day) + 1
        });
      } else {
        Alert.alert('Please select the tour place!')
      }
    }

  }

  // toNext = (data) => {
  //   console.log('-------data tour -------')
  //   console.log(this.state.dataForm3_day)
  //   console.log('')
  // }

  toNextForm = (data) => {
    const datas = [...this.state.dataForm3_eating_temp, ...this.state.dataForm3_eating];
    let price = parseFloat(this.state.price) + parseFloat(this.state.total)
    var value = '';
    if (!this.state.dataSelected2 && !this.state.dataSelected3 && this.state.dataSelected_temp.length > 0) {
      value = [{ id_lunch: '0', id_dinner: '0', day_it_eating: this.state.day }];
      const datas2 = [...this.state.dataForm3_eating_temp, ...value];
      this.props.navigation.push('form4', {
        dataForm2: data,
        days: this.state.days,
        name: this.state.name,
        price: price,
        dates: this.state.dates,
        dataForm3_day_temp: this.state.dataForm3_day,
        pax: this.state.pax,
        dataForm3_lunch_temp: this.state.dataForm3_lunch,
        dataForm3_eating_temp: datas2,
        dataForm3_dinner_temp: this.state.dataForm3_dinner,
        dataForm3_total_temp: this.state.dataForm3_total,
        day: parseInt(this.state.day) + 1
      });
    } else if(this.state.freeDay) {
      value = [{ id_lunch: '0', id_dinner: '0', day_it_eating: this.state.day }];
      const datas2 = [...this.state.dataForm3_eating_temp, ...value];
      this.props.navigation.push('form4', {
        dataForm2: data,
        days: this.state.days,
        name: this.state.name,
        price: price,
        dates: this.state.dates,
        dataForm3_day_temp: this.state.dataForm3_day,
        pax: this.state.pax,
        dataForm3_lunch_temp: this.state.dataForm3_lunch,
        dataForm3_eating_temp: datas2,
        dataForm3_dinner_temp: this.state.dataForm3_dinner,
        dataForm3_total_temp: this.state.dataForm3_total,
        day: parseInt(this.state.day) + 1
      });
    } else if (this.state.data_day && this.state.dataSelected_temp.length > 0) {
      this.props.navigation.push('form4', {
        dataForm2: data,
        days: this.state.days,
        name: this.state.name,
        price: price,
        dates: this.state.dates,
        dataForm3_day_temp: this.state.dataForm3_day,
        pax: this.state.pax,
        dataForm3_lunch_temp: this.state.dataForm3_lunch,
        dataForm3_eating_temp: datas,
        dataForm3_dinner_temp: this.state.dataForm3_dinner,
        dataForm3_total_temp: this.state.dataForm3_total,
        day: parseInt(this.state.day) + 1
      });
    } else{
      Alert.alert('Please select the tour place!')

    }
  }

  toAddSelectDay = (counts) => {
    this.setState({
      day: this.state.day.concat([{ id: "", day: counts, name: "", status: "" }])
    })
  }

  toRemoveSelectDay = (idx, name) => {
    this.setState({
      day: this.state.day.filter((s, sidx) => sidx !== idx && s.name !== name)
    })
  }

  toNameChange = (value, idx) => {
    const newday = this.state.day.map((Object, sidx) => {
      if (idx !== sidx) return Object;
      return { ...Object, name: value }
    });

    this.setState({ day: newday })

  }


  Updet = (id_ow, name_ow_id, name_ow_chinese, price_ow, value, include_ow_id, include_ow_chinese) => {
    if (!value === false) {
      const temp = this.state.dataSelected;
      if (temp) {
        const indexs = this.state.dataSelected.findIndex(
          x => x.id_ow === id_ow
        );
        // console.log(indexs)
        if (indexs === -1) {
          this.setState(state => {
            const index = state.dataSource.findIndex(
              x => x.id_ow === id_ow
            );
            return {
              dataSource: this.arrayHolder,
              text: '',
              data_day: true,
              dataSelected: [
                ...state.dataSelected,
                {
                  id_ow: id_ow, name_ow_id: name_ow_id, name_ow_chinese: name_ow_chinese,
                  include_ow_id: include_ow_id, include_ow_chinese: include_ow_chinese, price_ow: price_ow, value: value
                },
              ],

              dataSelected_temp: [
                ...state.dataSelected_temp,
                {
                  id_ow: id_ow, name_ow_id: name_ow_id, name_ow_chinese: name_ow_chinese,
                  include_ow_id: include_ow_id, include_ow_chinese: include_ow_chinese, price_ow: price_ow, value: value
                },
              ],

              dataForm3_day: [
                ...state.dataForm3_day,
                { id_ow: id_ow, day_it_tour: this.state.day, }
              ],
              total: parseInt(this.state.total) + parseInt(price_ow),
            };

          })
        } else {
          Alert.alert('Data already exist, please choose another!');
        }
      } else {
        this.setState(state => {
          const index = state.dataSource.findIndex(
            x => x.id_ow === id_ow
          );
          return {
            dataSource: this.arrayHolder,
            data_day: true,
            text: '',
            dataSelected: [
              ...state.dataSelected,
              {
                id_ow: id_ow, name_ow_id: name_ow_id, name_ow_chinese: name_ow_chinese,
                include_ow_id: include_ow_id, include_ow_chinese: include_ow_chinese, price_ow: price_ow, value: value
              },
            ],

            dataSelected_temp: [
              ...state.dataSelected_temp,
              {
                id_ow: id_ow, name_ow_id: name_ow_id, name_ow_chinese: name_ow_chinese,
                include_ow_id: include_ow_id, include_ow_chinese: include_ow_chinese, price_ow: price_ow, value: value
              },
            ],
            dataForm3_day: [
              ...state.dataForm3_day,
              { id_ow: id_ow, day_it_tour: this.state.day, }
            ],
            total: parseInt(this.state.total) + parseInt(price_ow),
          };

        })
      }
    } else {
      const data = this.state.dataSelected;
      const index = this.state.dataSelected.findIndex(
        x => x.id_ow === id_ow
      );
      data.splice(index, 1);

      const data3 = this.state.dataSelected_temp;
      const index3 = this.state.dataSelected_temp.findIndex(
        x => x.id_ow === id_ow
      );
      data3.splice(index3, 1);

      const data2 = this.state.dataForm3_day;
      const index2 = this.state.dataForm3_day.findIndex(
        x => x.id_ow === id_ow
      );
      data2.splice(index2, 1);
      if (!data) {
        this.setState({
          dataForm3_day: '',
          dataSelected: '',
          dataSelected_temp: '',
          text: '',
          data_day: false,
          total: parseInt(this.state.total) - parseInt(price_ow),
        })
      } else {
        this.setState({
          dataSelected: data,
          dataSelected_temp: data3,
          dataForm3_day: data2,
          total: parseInt(this.state.total) - parseInt(price_ow),
        })
      }
    }
  }

  Updet4 = (id, name_id, name_chinese, price, value, idx, status) => {
    if (!value === false) {
      if (status === 'lunch' && this.state.dataSelected2 === '') {
        const newData = this.state.dataForm3_eating.map((Object, sidx) => {
          if (idx !== sidx) return Object;
          return { ...Object, id_lunch: id, day_it_eating: this.state.day }
        });
        this.setState(state => {
          return {
            dataSelected2: [
              ...state.dataSelected2,
              { id_lunch: id, name_lunch_id: name_id, name_lunch_chinese: name_chinese, price_lunch: price, value: value },
            ],
            text2: '',

            dataForm3_lunch: [
              ...state.dataForm3_lunch,
              { day: this.state.day, id_lunch: id, name_lunch_id: name_id, name_lunch_chinese: name_chinese }
            ],
            total: parseInt(this.state.total) + parseInt(price),
            dataForm3_eating: newData,
          };

        })
        console.log(this.state.dataForm3_eating)
      } else if (status === 'dinner' && this.state.dataSelected3 === '') {
        const newData = this.state.dataForm3_eating.map((Object, sidx) => {
          if (idx !== sidx) return Object;
          return { ...Object, id_dinner: id, day_it_eating: this.state.day }
        });
        this.setState(state => {
          return {
            text3: '',

            dataSelected3: [
              ...state.dataSelected3,
              { id_dinner: id, name_dinner_id: name_id, name_dinner_chinese: name_chinese, price_dinner: price, value: value },
            ],
            dataForm3_eating: newData,
            dataForm3_dinner: [
              ...state.dataForm3_dinner,
              { day: this.state.day, id_dinner: id, name_dinner_id: name_id, name_dinner_chinese: name_chinese }
            ],
            total: parseInt(this.state.total) + parseInt(price),
          };

        })
        console.log(this.state.dataForm3_eating)
      }else{
        Alert.alert('You only can choose 1 place for dinner or lunch!')
        this.setState({
          text2: '',
          text3 : ''
        })
      }
    } else {
      if (status === 'dinner') {
        const data = this.state.dataSelected3;
        const index = this.state.dataSelected3.findIndex(
          x => x.id_dinner === id
        );
        data.splice(index, 1);

        const data2 = this.state.dataForm3_dinner;
        const index2 = this.state.dataForm3_dinner.findIndex(
          x => x.id_dinner === id
        );

        const newData = this.state.dataForm3_eating.map((Object, sidx) => {
          if (idx !== sidx) return Object;
          return { ...Object, id_dinner: '0', }
        });

        data2.splice(index2, 1);
        if (!data) {
          this.setState({
            dataSelected3: '',
            text3: '',
            dataForm3_lunch: '',
            total: parseInt(this.state.total) - parseInt(price),
          })
        } else {
          this.setState({
            dataForm3_dinner: data2,
            dataSelected3: '',
            dataForm3_eating: newData,
            total: parseInt(this.state.total) - parseInt(price),
          })
        }
        console.log(data)
      } else if (status === 'lunch') {
        const data = this.state.dataSelected2;
        const index = this.state.dataSelected2.findIndex(
          x => x.id_lunch === id
        );
        data.splice(index, 1);

        const data2 = this.state.dataForm3_lunch;
        const index2 = this.state.dataForm3_lunch.findIndex(
          x => x.id_lunch === id
        );
        data2.splice(index2, 1);

        const newData = this.state.dataForm3_eating.map((Object, sidx) => {
          if (idx !== sidx) return Object;
          return { ...Object, id_lunch: '0', }
        });
        if (!data) {
          this.setState({
            dataSelected2: '',
            text2: '',
            dataForm3_day: '',
            total: parseInt(this.state.total) - parseInt(price),
          })
        } else {
          this.setState({
            dataForm3_lunch: data2,
            dataSelected2: '',
            dataForm3_eating: newData,
            total: parseInt(this.state.total) - parseInt(price),
          })
        }
        console.log(data)
      }

    }


  }

  updateSearch(text) {
    const dataSelected = this.state.dataSelected;
    const newData = this.arrayHolder.filter(function (item) {
      const itemData = item.name_ow_id.toLowerCase();
      const itemData2 = item.name_ow_chinese;
      const textData = text.toLowerCase();
      return itemData.indexOf(textData) > -1 || itemData2.indexOf(textData) > -1;
    });
    this.setState({
      dataSource: newData,
      text: text
    })
  };

  updateSearch2(text) {
    const dataSelected = this.state.dataSelected;
    const newData = this.arrayHolder2.filter(function (item) {
      const itemData = item.name_lunch_id.toLowerCase();
      const itemData2 = item.name_lunch_chinese;
      const textData = text.toLowerCase();
      return itemData.indexOf(textData) > -1 || itemData2.indexOf(textData) > -1;
    });
    this.setState({
      dataSource2: newData,
      text2: text
    })
  };


  updateSearch3(text) {
    const dataSelected = this.state.dataSelected;
    const newData = this.arrayHolder3.filter(function (item) {
      const itemData = item.name_dinner_id.toLowerCase();
      const textData = text.toLowerCase();
      return itemData.indexOf(textData) > -1;
    });
    this.setState({
      dataSource3: newData,
      text3: text
    })
  };


  cekBox = (id_ow, name_ow_id, name_ow_chinese, price_ow, value, include_ow_id, include_ow_chinese) => {
    const data = this.state.dataSelected;
    const values = value;
    if (data) {
      const index = this.state.dataSelected.findIndex(
        x => x.id_ow === id_ow && x.value
      );
      //   console.log(index);
      if (index === -1) {
        return (
          <CheckBox
            onValueChange={(value) => this.Updet(id_ow, name_ow_id, name_ow_chinese, price_ow, value, include_ow_id, include_ow_chinese)}
            value={Boolean(value)}
            tintColors={{ true: '#f5a21d', false: '#f5a21d' }}
          />
        )
      } else if (index >= 0) {
        return (
          <View style={{ width: wp('17%'), height: hp('4%'), backgroundColor: '#ff3131', justifyContent: 'center', alignItems: 'center', }}>
            <Text style={{ fontSize: hp('1.7%'), fontWeight: 'bold', color: 'white' }}>
              Selected
                </Text>
          </View>
        )
      }
    } else {
      return (
        <CheckBox
          onValueChange={(value) => this.Updet(id_ow, name_ow_id, name_ow_chinese, price_ow, value, include_ow_id, include_ow_chinese)}
          value={Boolean(value)}
          tintColors={{ true: '#f5a21d', false: '#f5a21d' }}
        />
      )
    }

  }


  cekBox2 = (id_lunch, name_lunch_id, name_lunch_chinese, price_lunch, value, idx) => {
    const data = this.state.dataSelected2;
    const status = 'lunch';
    if (data) {
      const index = this.state.dataSelected2.findIndex(
        x => x.id_lunch === id_lunch && x.value
      );
      //   console.log(index);
      if (index === -1) {
        return (
          <CheckBox
            onValueChange={(value) => this.Updet4(id_lunch, name_lunch_id, name_lunch_chinese, price_lunch, value, idx, status)}
            value={Boolean(value)}
            tintColors={{ true: '#f5a21d', false: '#f5a21d' }}
          />
        )
      } else if (index >= 0) {
        return (
          <View style={{ width: wp('17%'), height: hp('4%'), backgroundColor: '#ff3131', justifyContent: 'center', alignItems: 'center', }}>
            <Text style={{ fontSize: hp('1.7%'), fontWeight: 'bold', color: 'white' }}>
              Selected
                </Text>
          </View>
        )
      }
    } else {
      return (
        <CheckBox
          onValueChange={(value) => this.Updet4(id_lunch, name_lunch_id, name_lunch_chinese, price_lunch, value, idx, status)}
          value={Boolean(value)}
          tintColors={{ true: '#f5a21d', false: '#f5a21d' }}
        />
      )
    }

  }

  cekBox3 = (id_dinner, name_dinner_id, name_dinner_chinese, price_dinner, value, idx) => {
    const data = this.state.dataSelected3;
    const status = 'dinner';
    if (data) {
      const index = this.state.dataSelected3.findIndex(
        x => x.id_dinner === id_dinner && x.value
      );
      //   console.log(index);
      if (index === -1) {
        return (
          <CheckBox
            onValueChange={(value) => this.Updet4(id_dinner, name_dinner_id, name_dinner_chinese, price_dinner, value, idx, status)}
            value={Boolean(value)}
            tintColors={{ true: '#f5a21d', false: '#f5a21d' }}
          />
        )
      } else if (index >= 0) {
        return (
          <View style={{ width: wp('17%'), height: hp('4%'), backgroundColor: '#ff3131', justifyContent: 'center', alignItems: 'center', }}>
            <Text style={{ fontSize: hp('1.7%'), fontWeight: 'bold', color: 'white' }}>
              Selected
                </Text>
          </View>
        )
      }
    } else {
      return (
        <CheckBox
          onValueChange={(value) => this.Updet4(id_dinner, name_dinner_id, name_dinner_chinese, price_dinner, value, idx, status)}
          value={Boolean(value)}
          tintColors={{ true: '#f5a21d', false: '#f5a21d' }}
        />
      )
    }

  }

  toFreeDay = () => {


    this.setState({
      freeDay: true,
      text :'',
      dataSelected_temp: '',
      dataSelected: this.state.dataSelected_temp_freeday,
      dataForm3_eating: '',
      dataSelected2: '',
      dataSelected3: '',
      dataForm3_day: [
        ...this.state.dataForm3_day,
        { id_ow: '0', day_it_tour: this.state.day, }
      ],
    })
    // console.log(this.state.freeDay)
  }

  toUnFreeDay = () => {
    const data2 = this.state.dataForm3_day;
    const index2 = this.state.dataForm3_day.findIndex(
      x => x.day_it_tour === this.state.day && x.id_ow === 0
    );
    data2.splice(index2, 1);

    this.setState({
      freeDay: false,
      dataForm3_day : data2,
      dataForm3_eating : [{ id_lunch: '0', id_dinner: '0', day_it_eating: '' }]
    })
    // console.log(this.state.freeDay)
  }

  toCheck = () => {
    if (this.state.dataSelected_temp && !this.state.text) {
      return (
        this.state.dataSelected_temp.map((Object, index) => (

          <View key={index} style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 20 }}>
            <View style={{ marginRight: 20, }}>
              <Icon name='ios-arrow-forward' size={hp('4%')} type='ionicon' color='#f5a21d' />
            </View>
            <View style={{ width: '80%', flexDirection: 'column', justifyContent: 'center' }}>
              <View style={{ marginTop: 5, flexDirection: 'row' }}>
                <Icon name='ios-pin' size={hp('2%')} type='ionicon' color='#f5a21d' style={{ marginTop: 3 }} />
                <Text style={{ marginLeft: 5, color: '#f5a21d', fontSize: hp('2.2%'), fontWeight: 'bold', }}>
                  {Object.name_ow_id} ({Object.name_ow_chinese})
                            </Text>
              </View>
              <View style={{ marginTop: 5, flexDirection: 'row', alignItems: 'center' }}>
                <Text style={{ color: '#f5a21d', fontSize: hp('2.2%'), }}>
                  Include : {Object.include_ow_id} ({Object.include_ow_chinese})
                            </Text>
              </View>
              {/* <View style={{ marginTop: 5, flexDirection: 'row', alignItems: 'center' }}>
                <Icon name='ios-cash' size={18} type='ionicon' color='#f5a21d' />

                <Text style={{ marginLeft: 5, color: '#f5a21d', fontSize: 16, }}>
                  Price :
                        </Text>
                <Text style={{ marginLeft: 5, color: '#f5a21d', fontSize: 16, fontWeight: 'bold', }}>
                  {CurrencyFormatter(parseInt(Object.price_ow))}
                </Text>
              </View> */}
            </View>

            <View style={{ justifyContent: 'center' }}>
              <CheckBox
                key={index}
                onValueChange={(value) => this.Updet(Object.id_ow, Object.name_ow_id, Object.name_ow_chinese, Object.price_ow, value, Object.include_ow_id, Object.include_ow_chinese)}
                value={Object.value}
                // checked = {Object.value}
                checkedColor='red'
                tintColors={{ true: '#f5a21d', false: '#f5a21d' }}
              />
            </View>
          </View>
        ))
      )
    }
    else if (this.state.freeDay && !this.state.dataSelected_temp && !this.state.text) {
      return (
        <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 20 }}>
          <Text style={{ color: '#f5a21d', fontSize: hp('2.2%'), fontWeight: 'bold', }}>
            Free day
              </Text>
        </View>
      )

    } else if (!this.state.dataSelected_temp && !this.state.text) {
      return (
        <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 20 }}>
          <Text style={{ color: '#f5a21d', fontSize: hp('2%'), fontWeight: 'bold', }}>
            No package selected
                      </Text>
        </View>
      )
    }
    else {
      return (
        this.state.dataSource.map((Object, index) => (

          <View key={index} style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 20 }}>
            <View style={{ marginRight: 20, }}>
              <Icon name='ios-arrow-forward' size={hp('4%')} type='ionicon' color='#f5a21d' />
            </View>
            <View style={{ width: '70%', flexDirection: 'column', justifyContent: 'center' }}>
              <View style={{ marginTop: 5, flexDirection: 'row' }}>
                <Icon name='ios-pin' size={hp('2%')} type='ionicon' color='#f5a21d' style={{ marginTop: 3 }} />
                <Text style={{ marginLeft: 5, color: '#f5a21d', fontSize: hp('2.2%'), fontWeight: 'bold', }}>
                  {Object.name_ow_id} ({Object.name_ow_chinese})
                            </Text>
              </View>
              <View style={{ marginTop: 5, flexDirection: 'row', alignItems: 'center' }}>
                <Text style={{ color: '#f5a21d', fontSize: hp('2.2%'), }}>
                  Include : {Object.include_ow_id} ({Object.include_ow_chinese})
                            </Text>
              </View>
              {/* <View style={{ marginTop: 5, flexDirection: 'row', alignItems: 'center' }}>
                <Icon name='ios-cash' size={18} type='ionicon' color='#f5a21d' />

                <Text style={{ marginLeft: 5, color: '#f5a21d', fontSize: 16, }}>
                  Price :
                        </Text>
                <Text style={{ marginLeft: 5, color: '#f5a21d', fontSize: 16, fontWeight: 'bold', }}>
                  {CurrencyFormatter(parseInt(Object.price_ow))}
                </Text>
              </View> */}
            </View>

            <View style={{ justifyContent: 'center' }}>
              {this.cekBox(Object.id_ow, Object.name_ow_id, Object.name_ow_chinese, Object.price_ow, Object.value, Object.include_ow_id, Object.include_ow_chinese)}
            </View>
          </View>
        ))
      )
    }
  }


  toCheck2 = (idx) => {
    if (this.state.dataSelected2 && !this.state.text2) {
      const status = 'lunch';
      return (
        this.state.dataSelected2.map((Object, index) => (

          <View key={index} style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 20 }}>
            <View style={{ marginRight: 20, }}>
              <Icon name='ios-arrow-forward' size={hp('4%')} type='ionicon' color='#f5a21d' />
            </View>
            <View style={{ width: '80%', flexDirection: 'column', justifyContent: 'center' }}>
              <View style={{ marginTop: 5, flexDirection: 'row' }}>
                <Icon name='ios-pin' size={hp('2%')} type='ionicon' color='#f5a21d' style={{ marginTop: 3, marginRight: 5 }} />
                <Text style={{ color: '#f5a21d', fontSize: hp('2.2%'), fontWeight: 'bold', }}>
                  {Object.name_lunch_id} ({Object.name_lunch_chinese})
                        </Text>
              </View>
              {/* <View style={{ marginTop: 5, flexDirection: 'row', alignItems: 'center' }}>
                <Icon name='ios-cash' size={18} type='ionicon' color='#f5a21d' />

                <Text style={{ marginLeft: 5, color: '#f5a21d', fontSize: 16, }}>
                  Price :
                        </Text>
                <Text style={{ marginLeft: 5, color: '#f5a21d', fontSize: 16, fontWeight: 'bold', }}>
                  {CurrencyFormatter(parseInt(Object.price_lunch))}
                </Text>
              </View> */}
            </View>

            <View style={{ justifyContent: 'center' }}>
              <CheckBox
                onValueChange={(value) => this.Updet4(Object.id_lunch, Object.name_lunch_id, Object.name_lunch_chinese,
                  Object.price_lunch, value, idx, status)}
                value={Object.value}
                checkedColor='red'
                tintColors={{ true: '#f5a21d', false: '#f5a21d' }}
              />
            </View>
          </View>
        ))
      )
    } else if (!this.state.dataSelected2 && !this.state.text2) {
      return (
        <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 20 }}>
          <Text style={{ color: '#f5a21d', fontSize: hp('2.2%'), fontWeight: 'bold', }}>
            No package selected
                        </Text>
        </View>
      )
    } else {
      return (
        this.state.dataSource2.map((Object, index) => (

          <View key={index} style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 20 }}>
            <View style={{ marginRight: 20, }}>
              <Icon name='ios-arrow-forward' size={hp('4%')} type='ionicon' color='#f5a21d' />
            </View>
            <View style={{ width: '70%', flexDirection: 'column', justifyContent: 'center' }}>
              <View style={{ marginTop: 5, flexDirection: 'row' }}>
                <Icon name='ios-pin' size={hp('2%')} type='ionicon' color='#f5a21d' style={{ marginTop: 3, marginRight: 5 }} />
                <Text style={{ color: '#f5a21d', fontSize: hp('2.2%'), fontWeight: 'bold', }}>
                  {Object.name_lunch_id} ({Object.name_lunch_chinese})
                        </Text>
              </View>
              {/* <View style={{ marginTop: 5, flexDirection: 'row', alignItems: 'center' }}>
                <Icon name='ios-cash' size={18} type='ionicon' color='#f5a21d' />

                <Text style={{ marginLeft: 5, color: '#f5a21d', fontSize: 16, }}>
                  Price :
                        </Text>
                <Text style={{ marginLeft: 5, color: '#f5a21d', fontSize: 16, fontWeight: 'bold', }}>
                  {CurrencyFormatter(parseInt(Object.price_lunch))}
                </Text>
              </View> */}
            </View>

            <View style={{ justifyContent: 'center' }}>
              {this.cekBox2(Object.id_lunch, Object.name_lunch_id, Object.name_lunch_chinese, Object.price_lunch, Object.value, idx)}
            </View>
          </View>
        ))
      )
    }
  }

  toCheck3 = (idx) => {
    if (this.state.dataSelected3 && !this.state.text3) {
      const status = 'dinner';
      return (
        this.state.dataSelected3.map((Object, index) => (

          <View key={index} style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 20 }}>
            <View style={{ marginRight: 20, }}>
              <Icon name='ios-arrow-forward' size={hp('4%')} type='ionicon' color='#f5a21d' />
            </View>
            <View style={{ width: '80%', flexDirection: 'column', justifyContent: 'center' }}>
              <View style={{ marginTop: 5, flexDirection: 'row' }}>
                <Icon name='ios-pin' size={hp('2.2%')} type='ionicon' color='#f5a21d' style={{ marginTop: 3, marginRight: 5 }} />
                <Text style={{ color: '#f5a21d', fontSize: hp('2%'), fontWeight: 'bold', }}>
                  {Object.name_dinner_id} ({Object.name_dinner_chinese})
                        </Text>
              </View>
              {/* <View style={{ marginTop: 5, flexDirection: 'row', alignItems: 'center' }}>
                <Icon name='ios-cash' size={18} type='ionicon' color='#f5a21d' />

                <Text style={{ marginLeft: 5, color: '#f5a21d', fontSize: 16, }}>
                  Price :
                        </Text>
                <Text style={{ marginLeft: 5, color: '#f5a21d', fontSize: 16, fontWeight: 'bold', }}>
                  {CurrencyFormatter(parseInt(Object.price_dinner))}
                </Text>
              </View> */}
            </View>

            <View style={{ justifyContent: 'center' }}>
              <CheckBox
                onValueChange={(value) => this.Updet4(Object.id_dinner, Object.name_dinner_id,
                  Object.name_dinner_chinese, Object.price_dinner, value, idx, status)}
                value={Object.value}
                checkedColor='red'
                tintColors={{ true: '#f5a21d', false: '#f5a21d' }}
              />
            </View>
          </View>
        ))
      )
    } else if (!this.state.dataSelected3 && !this.state.text3) {
      return (
        <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 20 }}>
          <Text style={{ color: '#f5a21d', fontSize: hp('2.2%'), fontWeight: 'bold', }}>
            No package selected
                        </Text>
        </View>
      )
    } else {
      return (
        this.state.dataSource3.map((Object, index) => (

          <View key={index} style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 20 }}>
            <View style={{ marginRight: 20, }}>
              <Icon name='ios-arrow-forward' size={hp('4%')} type='ionicon' color='#f5a21d' />
            </View>
            <View style={{ width: '70%', flexDirection: 'column', justifyContent: 'center' }}>
              <View style={{ marginTop: 5, flexDirection: 'row' }}>
                <Icon name='ios-pin' size={hp('2%')} type='ionicon' color='#f5a21d' style={{ marginTop: 3, marginRight: 5 }} />
                <Text style={{ color: '#f5a21d', fontSize: hp('2.2%'), fontWeight: 'bold', }}>
                  {Object.name_dinner_id} ({Object.name_dinner_chinese})
                        </Text>
              </View>
              {/* <View style={{ marginTop: 5, flexDirection: 'row', alignItems: 'center' }}>
                <Icon name='ios-cash' size={18} type='ionicon' color='#f5a21d' />

                <Text style={{ marginLeft: 5, color: '#f5a21d', fontSize: 16, }}>
                  Price :
                        </Text>
                <Text style={{ marginLeft: 5, color: '#f5a21d', fontSize: 16, fontWeight: 'bold', }}>
                  {CurrencyFormatter(parseInt(Object.price_dinner))}
                </Text>
              </View> */}
            </View>

            <View style={{ justifyContent: 'center' }}>
              {this.cekBox3(Object.id_dinner, Object.name_dinner_id, Object.name_dinner_chinese, Object.price_dinner, Object.value, idx)}
            </View>
          </View>
        ))
      )
    }
  }

  toButton = (dataform2) => {
    if (parseInt(this.state.days) === parseInt(this.state.day)) {
      return (
        <View style={{ alignItems: 'center' }}>
          <TouchableOpacity
            onPress={this.toNextForm.bind(this, dataform2)}
            style={{ width: wp('25%'), borderRadius: 30, height: hp('4.5%'),  backgroundColor: '#f5a21d', justifyContent: 'center', alignItems: 'center', }}>
            <Text style={{ fontSize: hp('2%'), fontWeight: 'bold' }}>
              Finish
          </Text>
          </TouchableOpacity>
        </View>
      )
    } else {
      return (
        <View style={{ alignItems: 'center' }}>
          <TouchableOpacity
            onPress={this.toNext.bind(this, this.state.dataForm2)}
            style={{ width: wp('25%'), borderRadius: 30, height: hp('4.5%'),  backgroundColor: '#00913d', justifyContent: 'center', alignItems: 'center', }}>
            <Text style={{ fontSize: hp('2%'), fontWeight: 'bold', color: 'white' }}>
              Next Day
                  </Text>
          </TouchableOpacity>
        </View>
      )
    }
  }

  toSearchBar = () => {
    if (this.state.freeDay) {
      return null
    } else {
      return (
        <SearchBar
          placeholder="Type Here..."
          onChangeText={text => this.updateSearch(text)}
          containerStyle={{
            backgroundColor: '#1e1e1e', borderWidth: 0.5, borderColor: '#f5a21d', borderTopColor: '#f5a21d',
            borderBottomColor: '#f5a21d', marginTop: 15
          }}
          inputContainerStyle={{ height: hp('4%'), backgroundColor: '#1e1e1e' }}
          inputStyle={{ fontSize: hp('2%'), color: '#f5a21d', backgroundColor: '#1e1e1e' }}
          placeholderTextColor={'#f5a21d'}
          placeholder={'Choose tour package'}
          leftIconContainerStyle={{}}
          value={this.state.text}
        />
      )
    }
  }

  toLunch = () => {
    if (this.state.freeDay) {
      return null
    } else {
      return (
        this.state.dataForm3_eating.map((Object, idx) => (
          <View key={idx} style={{
            justifyContent: 'center', paddingVertical: 20, borderBottomColor: '#f5a21d',
            borderBottomWidth: 0.5, marginBottom: 10
          }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>

              <View style={{ flexDirection: 'row', height: 40, justifyContent: 'space-between', alignItems: 'center' }}>
                <Text style={{ color: '#f5a21d', fontSize: 25, fontWeight: 'bold', }}>
                  Lunch
                  </Text>
              </View>
            </View>

            <View>
              <SearchBar
                placeholder="Type Here..."
                onChangeText={text => this.updateSearch2(text)}
                containerStyle={{
                  backgroundColor: '#1e1e1e', borderWidth: 0.5, borderColor: '#f5a21d', borderTopColor: '#f5a21d',
                  borderBottomColor: '#f5a21d', marginTop: 15,
                }}
                inputContainerStyle={{ height: 30, backgroundColor: '#1e1e1e' }}
                inputStyle={{ fontSize: 15, color: '#f5a21d', backgroundColor: '#1e1e1e' }}
                placeholderTextColor={'#f5a21d'}
                placeholder={'Choose lunch place'}
                leftIconContainerStyle={{}}
                value={this.state.text2}
              />
            </View>
            {this.toCheck2(idx)}


          </View>
        ))

      )
    }
  }

  toDinner = () => {
    if (this.state.freeDay) {
      return null
    } else {
      return (
        this.state.dataForm3_eating.map((Object, idx) => (
          <View key={idx} style={{ justifyContent: 'center', paddingVertical: 20, borderBottomColor: '#f5a21d', borderBottomWidth: 0.5, marginBottom: 10 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>

              <View style={{ flexDirection: 'row', height: 40, justifyContent: 'space-between', alignItems: 'center' }}>
                <Text style={{ color: '#f5a21d', fontSize: 25, fontWeight: 'bold', }}>
                  Dinner
                  </Text>
              </View>
            </View>

            <View>
              <SearchBar
                placeholder="Type Here..."
                onChangeText={text => this.updateSearch3(text)}
                containerStyle={{
                  backgroundColor: '#1e1e1e', borderWidth: 0.5, borderColor: '#f5a21d', borderTopColor: '#f5a21d',
                  borderBottomColor: '#f5a21d', marginTop: 15,
                }}
                inputContainerStyle={{ height: 30, backgroundColor: '#1e1e1e' }}
                inputStyle={{ fontSize: 15, color: '#f5a21d', backgroundColor: '#1e1e1e' }}
                placeholderTextColor={'#f5a21d'}
                placeholder={'Choose dinner place'}
                leftIconContainerStyle={{}}
                value={this.state.text3}
              />
            </View>

            {this.toCheck3(idx)}

          </View>
        ))

      )
    }
  }

  toBtnFree = () => {
    if (this.state.freeDay) {
      return (
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <TouchableOpacity
            onPress={this.toUnFreeDay}
            style={{
              flexDirection: 'row', marginLeft: 10, justifyContent: 'center', alignItems: 'center',  width: wp('40%'),
              height: hp('4%'), backgroundColor: '#00913d'
            }}
          // onPress={() => this.toFreeDay(this.state.count)}
          >
            <Text style={{ color: 'black', fontSize: hp('1.8%'), fontWeight: 'bold', marginRight: 5, color: 'white' }}>
              Unset free day
                                            </Text>
            <Icon name='ios-log-out' size={hp('2.2%')} type='ionicon' color='white' />

          </TouchableOpacity>
        </View>
      )
    }
    else {
      return (
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <TouchableOpacity
            onPress={this.toFreeDay}
            style={{
              flexDirection: 'row', marginLeft: 10, justifyContent: 'center', alignItems: 'center', width: wp('40%'),
              height: hp('4%'), backgroundColor: '#f5a21d'
            }}
          // onPress={() => this.toFreeDay(this.state.count)}
          >
            <Text style={{ color: 'black', fontSize: hp('1.8%'), fontWeight: 'bold', marginRight: 5 }}>
              Set as a free day
              </Text>
            <Icon name='ios-log-out' size={hp('2.2%')} type='ionicon' color='#1A1818' />

          </TouchableOpacity>
        </View>
      )
    }
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: '#242121', alignItems: 'center', justifyContent: 'center', }}>
        <Image source={require('../../assets/bg.png')} style={{ position: 'absolute', resizeMode: 'contain' }} />
        {/* <Image source={require('../../assets/logo1.png')} style={{ position: 'absolute', resizeMode: 'contain',width: 300, opacity:0.15 }} /> */}
        <View style={{ flex: 2.5, justifyContent: 'center', borderBottomColor: '#f5a21d', borderBottomWidth: 0.5, width: '80%', }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>

            <Text style={{ color: '#f5a21d', fontSize: hp('4%'), fontWeight: 'bold' }}>
            Tour Place
                        </Text>
            {this.toButton(this.state.dataForm2)}

          </View>
          <Text style={{ color: '#f5a21d', fontSize: hp('2%'), fontWeight: 'normal', marginTop: 15 }}>
            Choose tour package, lunch and dinner
                        </Text>
        </View>

        <View style={{ flex: 10, width: '80%' }}>
          <ScrollView>
            <ScrollView style={{ height: '60%' }}>

              <View style={{ justifyContent: 'center', paddingVertical: 20, borderBottomColor: '#f5a21d', borderBottomWidth: 0.5, }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>

                  <View style={{ flexDirection: 'row', height: hp('5%'), justifyContent: 'space-between', alignItems: 'center' }}>
                    <Text style={{ color: '#f5a21d', fontSize: hp('4%'), fontWeight: 'bold', }}>
                      Day {this.state.day}
                    </Text>
                  </View>
                  {this.toBtnFree()}
                </View>


                <View>
                  {this.toSearchBar()}
                </View>

                {this.toCheck()}

              </View>

              {/* <View style={{ flexDirection: 'row', marginTop: 20, height: 40, backgroundColor: '#f5a21d', justifyContent: 'center', alignItems: 'center' }}>
                <Icon name='ios-cash' size={22} type='ionicon' color='#1A1818' />
                <Text style={{ marginLeft: 7, color: '#1A1818', fontSize: 17, fontWeight: 'bold' }}>
                  {CurrencyFormatter(parseInt(this.state.total))}
                </Text>
              </View> */}
            </ScrollView>

            {/* -------------LUNCH------------------ */}

            {this.toLunch()}

            {/* ///////////////------LUNCH---------////////////// */}

            {/* -------------diinerh------------------ */}

            {this.toDinner()}

            {/* ///////////////------dinner---------////////////// */}
          </ScrollView>

          {/* --------- footer -------------- */}


          {/* ---------- footer ------------ */}
        </View>
      </View>
    )
  }
}

export default index