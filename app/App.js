import React from 'react';
const moment = require('moment');

import {View, Text} from 'react-native';

import {Deals} from './Components/Deals/';
import {Days} from './Components/Days/';
import {show} from './utils/showData';
// import {onGetData} from './utils/onGetData';
import {checkEmpty} from './utils/checkEmpty';
import {selectDeals} from './utils/selectDeals';
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
      .getData()
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

  saveToState = (cb, val) => {
    let data = cb(val);
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

  executeDeals = (cb, value, index, dataDeal) => {
    let data = cb(value, index, dataDeal);
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

    show(this.state.dataDummy);

    this.saveToState(show, this.state.dataDummy);

    this.checkDay(this.state.dataDeals[7], checkEmpty);

    this.executeDeals(
      selectDeals,
      new Date().getDay() + 1,
      0,
      this.state.dataDeals,
    );
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
