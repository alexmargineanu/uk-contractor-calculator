import React, { Component } from 'react';
import * as util from './util.js';
import NationalInsurance from './NationalInsurance';
import IncomeTax from './IncomeTax';
import ContractDetails from './ContractDetails';

import './index.css';

class App extends Component {

  state = {
    dayRate: 350,
    noWeeks: 12,
    incomeTax: 0,
    nationalInsurance: 0,
  };

  updateDayRate = (dayRate) => {
    this.setState({ dayRate });
  }
  updateNumberOfWeeks = (noWeeks) => {
    this.setState({ noWeeks });
  }

  handleNationalInsuranceChange = (nationalInsurance) => {
    this.setState({ nationalInsurance });
  }
  handleIncomeTaxChange = (incomeTax) => {
    this.setState({ incomeTax });
  }

  render() {
    return (
      <>
        <ContractDetails
          onChangeRate={this.updateDayRate}
          onChangeWeeks={this.updateNumberOfWeeks}
          dayRate={this.state.dayRate}
          noWeeks={this.state.noWeeks}
        />

        <NationalInsurance
          weeklyRate={this.state.dayRate * 5}
          onChange={this.handleNationalInsuranceChange}
        />

        <IncomeTax
          yearlyRate={this.state.dayRate * 5 * this.state.noWeeks}
          onChange={this.handleIncomeTaxChange}
        />

        <h1>Gross pay: {util.financial(this.state.dayRate * 5)}/week</h1>
        <h1>Net pay: {util.financial((this.state.dayRate * 5) - this.state.nationalInsurance - (this.state.incomeTax/52))}/week</h1>
    </>
    );
  }
}

export default App;
