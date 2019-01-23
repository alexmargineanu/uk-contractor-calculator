import React, { Component } from 'react';
import * as util from './util.js';
import NationalInsurance from './NationalInsurance';
import IncomeTax from './IncomeTax';

import './index.css';

class App extends Component {

  state = {
    dayRate: 350,
    noWeeks: 12,
    incomeTax: 0,
    nationalInsurance: 0,
  };

  updateDayRate = (event) => {
    this.setState({ dayRate: event.target.value });
  }
  updateNumberOfWeeks = (event) => {
    this.setState({ noWeeks: event.target.value });
  }

  handleNationalInsuranceChange = (value) => {
    this.setState({ nationalInsurance: value });
  }
  handleIncomeTaxChange = (value) => {
    this.setState({ incomeTax: value });
  }

  render() {
    return (
      <div>
        <h1>Day rate £
          <input
            className="dayRate"
            type="number"
            step="10"
            min="0"
            onChange={this.updateDayRate}
            value={this.state.dayRate}
          />
      for
          <input
            className="dayRate"
            type="number"
            min="1"
            onChange={this.updateNumberOfWeeks}
            value={this.state.noWeeks}
          /> weeks
        </h1>

        <NationalInsurance
          weeklyRate={this.state.dayRate * 5}
          onChange={this.handleNationalInsuranceChange}
        />
        <IncomeTax
          yearlyRate={this.state.dayRate * this.state.noWeeks * 5}
          onChange={this.handleIncomeTaxChange}
        />
        <h1>Gross pay: {util.financial(this.state.dayRate * 5)}/week</h1>
        <h1>Net pay: {util.financial((this.state.dayRate * 5) - this.state.nationalInsurance - (this.state.incomeTax/52))}/week</h1>

    </div>
    );
  }
}

export default App;
