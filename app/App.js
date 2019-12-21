/* eslint-disable react-native/no-inline-styles */
import React from 'react';

import CardView from 'react-native-rn-cardview';
const moment = require('moment');

import {View, Text, FlatList, TouchableOpacity, StyleSheet} from 'react-native';
import {dates} from './utils/date';
import Colors from './styles/Colors';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentDate: new Date(),
      markedDate: moment(new Date()).format('YYYY-MM-DD'),
      data: null,
      success: false,
      active: false,
      id: null,
      sun: null,
      mon: null,
      tue: null,
      wed: null,
      thu: null,
      fri: null,
      sat: null,
      selected: false,
      all: null,
      index: null,
      discount: null,
      selectedDeal: false,
      activeDate: false,
      emptyDate: null,
      emptySun: null,
      emptyMon: null,
      emptyTue: null,
      emptyWed: null,
      emptyThu: null,
      emptyFri: null,
      emptySat: null,
      idDeal: null,
      allDeal: null,
    };
  }

  onGetData = async () => {
    await fetch(
      'https://ulo.life/api/timeslots?provider_id=7c8ea264-2cd3-4e5b-8f40-46a1a6fda174&sort_by=created_at&order=asc&app_version=1.10.0',
    )
      .then(response => response.json())
      .then(responseJson => {
        this.setState({
          data: responseJson,
          success: true,
        });
      })
      .catch(error => {
        console.error(error);
      });
  };

  pushDeal = (item, day, all) => {
    if (item.active === 1) {
      day.push(item);
    }
  };

  showData = () => {
    let sun = [];
    let mon = [];
    let tue = [];
    let wed = [];
    let thu = [];
    let fri = [];
    let sat = [];
    let all = [];
    this.state.data.data.map(item => {
      switch (item.day_of_week.toString()) {
        case '0':
          this.pushDeal(item, sun);
          break;
        case '1':
          this.pushDeal(item, mon);
          break;
        case '2':
          this.pushDeal(item, tue);
          break;
        case '3':
          this.pushDeal(item, wed);
          break;
        case '4':
          this.pushDeal(item, thu);
          break;
        case '5':
          this.pushDeal(item, fri);
          break;
        case '6':
          this.pushDeal(item, sat);
          break;
      }
    });
    all.push(
      {day: {sun: sun}},
      {day: {mon: mon}},
      {day: {tue: tue}},
      {day: {wed: wed}},
      {day: {thu: thu}},
      {day: {fri: fri}},
      {day: {sat: sat}},
    );
    this.setState({
      sun: sun,
      mon: mon,
      tue: tue,
      wed: wed,
      thu: thu,
      fri: fri,
      sat: sat,
      all: all,
    });
  };

  checkEmpty = () => {
    this.state.all.map(item => {
      if (item.day.sun && item.day.sun.length < 1) {
        this.setState({
          emptySun: 'SUN',
        });
      } else if (item.day.mon && item.day.mon.length < 1) {
        this.setState({
          emptyMon: 'MON',
        });
      } else if (item.day.tue && item.day.tue.length < 1) {
        this.setState({
          emptyTue: 'TUE',
        });
      } else if (item.day.wed && item.day.wed.length < 1) {
        this.setState({
          emptyWed: 'WED',
        });
      } else if (item.day.thu && item.day.thu.length < 1) {
        this.setState({
          emptyThu: 'THU',
        });
      } else if (item.day.fri && item.day.fri.length < 1) {
        this.setState({
          emptyFri: 'FRI',
        });
      } else if (item.day.sat && item.day.sat.length < 1) {
        this.setState({
          emptySat: 'SAT',
        });
      }
    });
  };

  findMaxDiscount = arr => {
    let discounts = [];
    arr.map(item => {
      discounts.push(item.discount);
    });

    let result = discounts.reduce(function(p, v) {
      return p > v ? p : v;
    });

    return result;
  };

  findIndexOfMaxDisount = val => {
    let discounts = [];
    val.map(item => {
      discounts.push(item.discount);
    });
    let indexOfMaxValue = discounts.reduce(
      (iMax, x, i, arr) => (x > arr[iMax] ? i : iMax),
      0,
    );
    return indexOfMaxValue;
  };

  async componentDidMount() {
    await this.onGetData();
    await this.showData();
    await this.checkEmpty();
    this.selectDeals(new Date().getDay() + 1, 0);
  }

  getEachDeal = async (day, index) => {
    let discount = await this.findMaxDiscount(day);
    let idDeal = await this.findIndexOfMaxDisount(day);
    this.setState({
      allDeal: day,
      selected: true,
      index: index,
      discount: discount,
      active: true,
      selectedDeal: false,
      activeDate: true,
      idDeal: idDeal,
    });
  };

  selectDeals = (value, index) => {
    switch (value) {
      case 1:
        /*check whether the data is empty or not,
          if empty then move to next deal until there is data found,
          not really recursive */
        if (this.state.sun.length > 0) {
          this.getEachDeal(this.state.sun, index);
        } else {
          this.selectDeals(value + 1, index + 1);
        }

        break;
      case 2:
        if (this.state.mon.length > 0) {
          this.getEachDeal(this.state.mon, index);
        } else {
          this.selectDeals(value + 1, index + 1);
        }

        break;
      case 3:
        if (this.state.tue.length > 0) {
          this.getEachDeal(this.state.tue, index);
        } else {
          this.selectDeals(value + 1, index + 1);
        }

        break;
      case 4:
        if (this.state.wed.length > 0) {
          this.getEachDeal(this.state.wed, index);
        } else {
          this.selectDeals(value + 1, index + 1);
        }

        break;
      case 5:
        if (this.state.thu.length > 0) {
          this.getEachDeal(this.state.thu, index);
        } else {
          this.selectDeals(value + 1, index + 1);
        }

        break;
      case 6:
        if (this.state.fri.length > 0) {
          this.getEachDeal(this.state.fri, index);
        } else {
          this.selectDeals(value + 1, index + 1);
        }

        break;
      case 7:
        if (this.state.sat.length > 0) {
          this.getEachDeal(this.state.sat, index);
        } else {
          this.selectDeals(value + 1, index + 1);
        }

        break;
    }
  };

  render() {
    console.log("SUN", this.state.sun);
    console.log("TUE", this.state.tue);
    //generate dates
    let listDates = dates();
    const deals = (
      <View style={styles.containerDeals}>
        <View style={styles.subContainerDeals}>
          <FlatList
            horizontal={true}
            style={{flexGrow: 0}}
            data={this.state.allDeal}
            renderItem={({item, index}) => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    this.setState({
                      active: true,
                      id: index,
                      selectedDeal: true,
                    });
                  }}
                  style={{height: 100}}>
                  <View style={styles.dealCardStyle}>
                    <CardView
                      cardElevation={5}
                      maxCardElevation={5}
                      radius={10}
                      backgroundColor={Colors.white}>
                      <View
                        style={
                          this.state.active &&
                          (this.state.selectedDeal
                            ? this.state.id === index
                            : this.state.idDeal === index)
                            ? styles.activeDeal
                            : styles.inActiveDeal
                        }>
                        <View style={styles.textDeal}>
                          <Text
                            style={
                              this.state.active &&
                              (this.state.selectedDeal
                                ? this.state.id === index
                                : this.state.idDeal === index)
                                ? {marginTop: 15, fontSize: 10, color: 'white'}
                                : {
                                    marginTop: 15,
                                    fontSize: 10,
                                    color: Colors.semiPink,
                                  }
                            }>
                            {item.start_time}pm
                          </Text>
                          <Text
                            style={
                              this.state.active &&
                              (this.state.selectedDeal
                                ? this.state.id === index
                                : this.state.idDeal === index)
                                ? {fontSize: 17, color: 'white'}
                                : {fontSize: 17, color: Colors.semiPink}
                            }>
                            {item.discount}%
                          </Text>
                        </View>
                      </View>
                    </CardView>
                  </View>
                </TouchableOpacity>
              );
            }}
          />
        </View>
      </View>
    );

    return (
      <View style={{flex: 4}}>
        <Text style={styles.heading1}>Daily Deals</Text>

        {this.state.success === true &&
          this.state.data != null &&
          this.state.data.data.length > 0 && (
            <View style={{flex: 1}}>
              <View style={styles.mainContainer}>
                <FlatList
                  horizontal={true}
                  data={listDates}
                  style={{height: 65, flexGrow: 0}}
                  renderItem={({item, index}) => {
                    const dayOfTheWeek = item[3];

                    return (
                      item[0] !== this.state.emptySat &&
                      item[0] !== this.state.emptyFri &&
                      item[0] !== this.state.emptySun &&
                      item[0] !== this.state.emptyMon &&
                      item[0] !== this.state.emptyTue &&
                      item[0] !== this.state.emptyWed &&
                      item[0] !== this.state.emptyThu && (
                        <TouchableOpacity
                          onPress={() => {
                            // let lists = [];
                            switch (dayOfTheWeek) {
                              //if it is sunday
                              case '1':
                                this.selectDeals(1, index);
                                break;
                              case '2':
                                this.selectDeals(2, index);
                                break;
                              case '3':
                                this.selectDeals(3, index);
                                break;
                              case '4':
                                this.selectDeals(4, index);
                                break;
                              case '5':
                                this.selectDeals(5, index);
                                break;
                              case '6':
                                this.selectDeals(6, index);
                                break;
                              case '7':
                                this.selectDeals(7, index);
                                break;
                              default:
                                break;
                            }
                          }}
                          style={{height: 70, marginLeft: 0}}>
                          <CardView
                            cardElevation={4}
                            maxCardElevation={4}
                            radius={7}
                            backgroundColor={'#F4F4F4'}>
                            <View style={styles.dayCard}>
                              <Text
                                style={
                                  this.state.selected &&
                                  this.state.index === index
                                    ? {fontSize: 7, color: Colors.semiPink}
                                    : {fontSize: 7, color: Colors.black}
                                }>
                                {item[0]}
                              </Text>
                              <Text
                                style={
                                  this.state.selected &&
                                  this.state.index === index
                                    ? {
                                        color: Colors.semiPink,
                                        fontSize: 17,
                                        fontWeight: 'bold',
                                      }
                                    : {
                                        color: Colors.black,
                                        fontSize: 17,
                                        fontWeight: 'bold',
                                      }
                                }>
                                {item[1]}
                              </Text>
                              <Text
                                style={
                                  this.state.selected &&
                                  this.state.index === index
                                    ? {fontSize: 9, color: Colors.semiPink}
                                    : {fontSize: 9, color: Colors.black}
                                }>
                                {item[2]}
                              </Text>
                            </View>
                          </CardView>
                        </TouchableOpacity>
                      )
                    );
                  }}
                />
              </View>

              {deals}
            </View>
          )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainContainer: {
    paddingRight: 0,
    paddingLeft: 25,
    paddingTop: 0,
    paddingBottom: 0,
  },
  containerDeals: {
    flex: 1,
    height: 200,
    marginTop: 0,
    paddingRight: 0,
    paddingLeft: 0,
    paddingTop: 0,
    paddingBottom: 0,
    backgroundColor: '#F9F9F9',
  },
  subContainerDeals: {
    paddingRight: 0,
    paddingLeft: 25,
    paddingTop: 0,
    paddingBottom: 0,
  },
  dealCardStyle: {
    flex: 1,
    marginTop: 0,
    height: 80,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeDeal: {
    width: 103,
    height: 60,
    backgroundColor: '#FB4D63',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inActiveDeal: {
    width: 103,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textDeal: {
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 20,
    marginBottom: 15,
  },
  heading1: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 0,
    paddingRight: 0,
    paddingLeft: 28,
    paddingTop: 20,
    paddingBottom: 3,
  },
  dayCard: {
    backgroundColor: '#F2F2F2',
    paddingLeft: 10,
    paddingTop: 5,
    width: 52,
    height: 55,
    borderRightWidth: 1,
    borderStyle: 'solid',
    borderRightColor: 'red',
    borderRadius: 2,
  },
});
