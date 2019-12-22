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
import {checkEmpty} from './utils/checkEmpty';
import {selectDeals} from './utils/selectDeals';
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

  async componentDidMount() {
    await onGetData(this.state.setState);
    await show(this.state.data, this.state.setState);
    await checkEmpty(this.state.all, this.state.setState);
    await selectDeals(new Date().getDay() + 1, 0, this.state);
  }

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
                selectDeals={selectDeals}
                stateObj={this.state}
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
