import React from 'react';
const moment = require('moment');

import {View, Text} from 'react-native';

import {Deals} from './Components/Deals/';
import {Days} from './Components/Days/';
// import {onGetData} from './utils/onGetData';
import {selectDeals} from './utils/selectDeals';
import {saveToState} from './utils/saveToState';
import main from './styles/main';
import api from '../app/services/apiService';
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
    await api
      .getData({
        provider_id: '7c8ea264-2cd3-4e5b-8f40-46a1a6fda174',
        sort_by: 'created_at',
        order: 'asc',
        app_version: '1.10.0',
      })
      .then(responseJson => {
        this.setState({
          dataDummy: responseJson.data,
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

  saveToModel = val => {
    let results = saveToState(val);
    this.setState({
      dataDeals: results,
    });
  };

  checkDay = val => {
    let emptyArr = [
      {emptySun: 'SUN'},
      {emptyMon: 'MON'},
      {emptyTue: 'TUE'},
      {emptyWed: 'WED'},
      {emptyThu: 'THU'},
      {emptyFri: 'FRI'},
      {emptySat: 'SAT'},
    ];
    val.map(item => {
      for (let i = 1; i <= 7; i++) {
        if (item.day[i.toString()] && item.day[i.toString()].length < 1) {
          this.setState(emptyArr[i - 1]);
        }
      }
    });
  };

  executeDeals = (value, index, dataDeal) => {
    let data = selectDeals(value, index, dataDeal);
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

    // this.saveToState(this.state.dataDummy);
    this.saveToModel(this.state.dataDummy);

    this.checkDay(this.state.dataDeals[7]);

    this.executeDeals(new Date().getDay() + 1, 0, this.state.dataDeals);
  }

  render() {
    return (
      <View style={{flex: 4}}>
        <Text style={main.heading1}>Daily Deals</Text>

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
