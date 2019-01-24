import React, { Component } from 'react';
import NationalInsurance from './NationalInsurance';
import IncomeTax from './IncomeTax';
import ContractDetails from './ContractDetails';
import NetPay from './NetPay';

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

        <IncomeTax
          yearlyRate={this.state.dayRate * 5 * this.state.noWeeks}
          onChange={this.handleIncomeTaxChange}
        />
        
        <NationalInsurance
          weeklyRate={this.state.dayRate * 5}
          onChange={this.handleNationalInsuranceChange}
        />

        <NetPay
          weeklyRate={this.state.dayRate * 5}
          noWeeks={this.state.noWeeks}
          incomeTax={this.state.incomeTax}
          nationalInsurance={this.state.nationalInsurance}
        />
    </>
    );
  }
}

export default App;
