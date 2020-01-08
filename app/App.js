import React from 'react';
const moment = require('moment');

import {View, Text, StyleSheet} from 'react-native';

import {Deals} from './Components/Deals/';
import {Days} from './Components/Days/';
import {show} from './utils/showData';
// import {onGetData} from './utils/onGetData';
import {checkEmpty} from './utils/checkEmpty';
import {selectDeals} from './utils/selectDeals';
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataDeals: null,
      currentDate: new Date(),
      markedDate: moment(new Date()).format('YYYY-MM-DD'),
      data: null,
      success: false,
      active: false,
      id: null,
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
      dataDummy: null,
    };
  }

  //call api
  onGetData = async () => {
    await fetch(
      'https://ulo.life/api/timeslots?provider_id=7c8ea264-2cd3-4e5b-8f40-46a1a6fda174&sort_by=created_at&order=asc&app_version=1.10.0',
    )
      .then(response => response.json())
      .then(responseJson => {
        this.setState({
          dataDummy: responseJson,
          success: true,
        });
      })
      .catch(error => {
        console.error(error);
      });
  };

  onPressDeal = nextState => {
    this.setState(nextState);
  };

  saveToState = async (cb, val) => {
    let data = await cb(val);
    this.setState({
      dataDeals: data,
    });
  };

  checkDay = (val, cb) => {
    let emptyArr = cb();
    val.map(item => {
      for (let i = 1; i <= 7; i++) {
        if (item.day[i.toString()] && item.day[i.toString()].length < 1) {
          this.setState(emptyArr[i - 1]);
        }
      }
    });
  };

  executeDeals = async (cb, value, index, dataDeal) => {
    let data = await cb(value, index, dataDeal);
    this.setState({
      allDeal: data.allDeal,
      selected: data.selected,
      index: data.index,
      discount: data.discount,
      active: data.active,
      selectedDeal: data.selectedDeal,
      activeDate: data.activeDate,
      idDeal: data.idDeal,
    });
  };

  async componentDidMount() {
    await this.onGetData();

    await show(this.state.dataDummy);

    await this.saveToState(show, this.state.dataDummy);

    await this.checkDay(this.state.dataDeals[7], checkEmpty);

    await this.executeDeals(
      selectDeals,
      new Date().getDay() + 1,
      0,
      this.state.dataDeals,
    );
  }

  render() {
    return (
      <View style={{flex: 4}}>
        <Text style={styles.heading1}>Daily Deals</Text>

        {this.state.success === true &&
          this.state.dataDummy != null &&
          this.state.dataDummy.data.length > 0 && (
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
                executeDeals={this.executeDeals}
                stateObj={this.state.dataDeals}
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
