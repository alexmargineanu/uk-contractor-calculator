import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _map from 'lodash/map';
import _sumBy from 'lodash/sumBy';
import './index.css';

function financial(amount) {
  return new Intl.NumberFormat('en-UK', {
    style: 'currency',
    currency: 'GBP',
    minimumFractionDigits: 0,
  }).format(Math.floor(amount));
}

class NI extends Component {
  static propTypes = {
    workingMonths: PropTypes.number.isRequired,
  };

  state = { dayRate: 400 };

  widthValueToPx(value) {
    return {
      width: this.percentOf(window.innerWidth, this.percentOfMonthlyRate(value)),
    };
  }

  percentOfMonthlyRate = (value) => {
    return this.percent(value, this.state.dayRate * 21.635);
  };

  percentOf(isPercent, of) {
    return Math.floor(isPercent * (of / 100));
  }

  percent(x, y) {
    return Math.floor((x / y) * 100);
  }

  updateDayRate = (event) => {
    this.setState({ dayRate: event.target.value });
  }

  render() {
    const monthlyRate = this.state.dayRate * 21.635;

    let tresholdAmmounts;

    if (monthlyRate > 3863) {
      tresholdAmmounts = [
        { ammount: 3863 - 702, employee: 12, employer: 13.8 },
        { ammount: monthlyRate - 3863, employee: 2, employer: 13.8 },
      ];
    } else {
      if (monthlyRate > 702) {
        tresholdAmmounts = [
          { ammount: monthlyRate - 702, employee: 12, employer: 13.8 },
        ];
      }
    }
    const niAmmounts = _map(tresholdAmmounts, (treshold) => {
      return {
        employee: this.percentOf(treshold.ammount, treshold.employee),
        employer: this.percentOf(treshold.ammount, treshold.employer),
      };
    });

    const summedTresholds = {
      employee: _sumBy(niAmmounts, 'employee'),
      employer: _sumBy(niAmmounts, 'employer'),
    };

    const niTotal = summedTresholds.employee + summedTresholds.employer;

    return (
      <div>
        <h1>Your day rate: £<input className="dayRate" type="number" step="50" min="0" onChange={this.updateDayRate} value={this.state.dayRate} /></h1>
        <h2>National Insurance {financial(niTotal)}/month <small>Category A earning {financial(monthlyRate)} gross salary</small></h2>

        <div className="earningsContainer">
          {niTotal > 0 && <div className="expensesNI" style={this.widthValueToPx(niTotal)}>National Insurance {financial(niTotal)}</div>}
          <div className="gross">GROSS {financial(monthlyRate)}</div>
        </div>
        <div>
          {summedTresholds.employee > 0 && (
            <div>
              <h3>NI Employee {financial(summedTresholds.employee)}/month</h3>
              <p>0% on your first £702</p>
              {tresholdAmmounts[0] && niAmmounts[0] && (<p>{tresholdAmmounts[0].employee}% ({financial(niAmmounts[0].employee)}) on your earnings between £702.01 and {monthlyRate > 3863 ? '£3,863' : financial(monthlyRate)}</p>)}
              {tresholdAmmounts[1] && niAmmounts[1] && (<p>{tresholdAmmounts[1].employee}% ({financial(niAmmounts[1].employee)}) on the remaining earnings above £3,863</p>)}
            </div>
          )}

          {summedTresholds.employer > 0 && (
            <div>
              <h3>NI Employer {financial(summedTresholds.employer)}/month</h3>
              <p>0% on your first £702</p>
              {tresholdAmmounts[0] && niAmmounts[0] && (<p>{tresholdAmmounts[0].employer}% ({financial(niAmmounts[0].employer)}) on your earnings between £702.01 and £3,863</p>)}
              {tresholdAmmounts[1] && niAmmounts[1] && (<p>{tresholdAmmounts[1].employer}% ({financial(niAmmounts[1].employer)}) on the remaining earnings above £3,863</p>)}
            </div>
          )}
      </div>
    </div>
    );
  }
}

export default NI;
