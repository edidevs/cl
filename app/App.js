import React from 'react';
const moment = require('moment');

import {View, Text} from 'react-native';

import {Deals} from './Components/Deals/';
import {Days} from './Components/Days/';
// import {onGetData} from './utils/onGetData';
import {selectDeals} from './utils/selectDeals';
import {saveToState} from './utils/saveToState';
import main from './styles/main';
import {transform} from './utils/transform';
import ProviderAPIService from '../app/services/ProviderAPIService';
import {getAvailableDates, getSelectedDate} from './utils/date';
import {getBestTimeSlot} from './utils/timeslot';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      availableDates: [],
      selectedDate: null,
      selectedTimeslot: null,
    };
  }

  async componentDidMount() {
    const providerId = '7c8ea264-2cd3-4e5b-8f40-46a1a6fda174';
    const data = await ProviderAPIService.getProviderByID(providerId);
    const availabilityData = transform(data);
    const availableDates = getAvailableDates(availabilityData);
    const selectedDate = getSelectedDate(availableDates);
    const selectedTimeslot = getBestTimeSlot(availabilityData, selectedDate);

    // Disabling eslint rule to set data in state without using Redux / HOC.
    // Not required during this test.
    // See https://reactjs.org/docs/react-component.html#componentdidmount
    // eslint-disable-next-line react/no-did-mount-set-state
    this.setState({
      availableDates,
      selectedDate,
      selectedTimeslot,
    });
  }

  onSelectDate = date => {
    this.setState({selectedDate: date});
  };

  onSelectTimeslot = timeslot => {
    this.setState({selectedTimeslot: timeslot});
  };

  // @todo Change render function implementation to use the data structure for state.
  // i.e. only use availableDates, selectedDate, selectedTimeslot
  // Also only use callbacks this.onSelectDate and this.onSelectTimeslot for onPress.
  // Implementation of <Dates> and <Deals> will need to change.
  // Also note to solve eslint issues, e.g. no inline styles etc.
  render() {
    return (
      <View>
        <Text style={main.heading1}>Daily Deals</Text>

        {this.state.success === true &&
          this.state.dataDummy != null &&
          this.state.dataDummy.data.length > 0 && (
            <View style={{flex: 1}}>
              <Days
                state={this.state}
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
