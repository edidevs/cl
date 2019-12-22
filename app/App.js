/* eslint-disable eslint-comments/no-unused-disable */
/* eslint-disable radix */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
const moment = require('moment');

import {View, Text, StyleSheet} from 'react-native';

import {Deals} from './Components/Deals/';
import {Days} from './Components/Days/';
import {show} from './utils/showData';
import {onGetData} from './utils/onGetData';
export default class App extends React.Component {
  constructor(props) {
    super(props);
    const that = this;
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
      setState: function(obj) {
        that.setState(obj);
      },
    };
  }

  onPressDeal = nextState => {
    this.setState(nextState);
  };

  pushDeal = (item, day) => {
    if (item.active === 1) {
      day.push(item);
    }
  };

  checkEmpty = () => {
    let emptyArr = [
      {emptySun: 'SUN'},
      {emptyMon: 'MON'},
      {emptyTue: 'TUE'},
      {emptyWed: 'WED'},
      {emptyThu: 'THU'},
      {emptyFri: 'FRI'},
      {emptySat: 'SAT'},
    ];

    this.state.all.map(item => {
      for (let i = 1; i <= 7; i++) {
        if (item.day[i.toString()] && item.day[i.toString()].length < 1) {
          this.setState(emptyArr[i - 1]);
        }
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
    await onGetData(this.state.setState);
    await show(this.state.data, this.state.setState);
    await this.checkEmpty();
    await this.selectDeals(new Date().getDay() + 1, 0);
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
    let daysInWeek = [
      this.state.sun,
      this.state.mon,
      this.state.tue,
      this.state.wed,
      this.state.thu,
      this.state.fri,
      this.state.sat,
    ];
    if (daysInWeek[value - 1].length > 0) {
      this.getEachDeal(daysInWeek[value - 1], index);
    } else {
      this.selectDeals(value + 1, index + 1);
    }
  };

  render() {
    //generate dates
    // let listDates = dates();

    return (
      <View style={{flex: 4}}>
        <Text style={styles.heading1}>Daily Deals</Text>

        {this.state.success === true &&
          this.state.data != null &&
          this.state.data.data.length > 0 && (
            <View style={{flex: 1}}>
              <Days
                emptySat={this.state.emptySat}
                emptySun={this.state.emptySun}
                emptyMon={this.state.emptyMon}
                emptyTue={this.state.emptyTue}
                emptyWed={this.state.emptyWed}
                emptyThu={this.state.emptyThu}
                emptyFri={this.state.emptyFri}
                selected={this.state.selected}
                idx={this.state.index}
                selectDeals={this.selectDeals}
              />

              <Deals
                onPressDeal={this.onPressDeal}
                active={this.state.active}
                selectedDeal={this.state.selectedDeal}
                id={this.state.id}
                idDeal={this.state.idDeal}
                allDeal={this.state.allDeal}
              />
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
