import React, { Component } from 'react';
import * as util from './util.js';
import NationalInsurance from './NationalInsurance';
import IncomeTax from './IncomeTax';

import './index.css';

class App extends Component {
  state = { dayRate: 350, noWeeks: 4 };

  updateDayRate = (event) => {
    this.setState({ dayRate: event.target.value });
  }
  updateNoWeeks = (event) => {
    this.setState({ noWeeks: event.target.value });
  }

  render() {
    return (
      <div>
        <h1>Your day rate: £
          <input
            className="dayRate"
            type="number"
            step="10"
            min="0"
            onChange={this.updateDayRate}
            value={this.state.dayRate}
          />
      Number of weeks:
          <input
            className="dayRate"
            type="number"
            min="1"
            onChange={this.updateNoWeeks}
            value={this.state.noWeeks}
          />
        </h1>
        <h1>Gross pay: {util.financial(this.state.dayRate * 5)}/week</h1>

        <NationalInsurance dayRate={this.state.dayRate} />
        <IncomeTax dayRate={this.state.dayRate} noWeeks={this.state.noWeeks} />

    </div>
    );
  }
}

export default App;
