import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _map from 'lodash/map';
import _sumBy from 'lodash/sumBy';

import Tresholds from './Tresholds';
import NationalInsuranceGrid from './Grid';

import * as util from '../util.js';
import '../index.css';

import { Header } from 'semantic-ui-react'

class NationalInsurance extends Component {
  static propTypes = {
    weeklyRate: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired,
  };

  componentDidMount() {
    const niAmmounts = this.calculateNI();
    this.props.onChange(_sumBy(niAmmounts, 'employee') + _sumBy(niAmmounts, 'employer'));
  }

  componentDidUpdate(prevProps) {
    if (this.props.weeklyRate !== prevProps.weeklyRate) {
      const niAmmounts = this.calculateNI();
      this.props.onChange(_sumBy(niAmmounts, 'employee') + _sumBy(niAmmounts, 'employer'));
    }
  }

  calculateNI() {
    const { weeklyRate } = this.props;

    const tresholdAmmounts = [];

    if (weeklyRate > Tresholds.UEL.value) {
      tresholdAmmounts.push({ code: 'UEL', 'ammount': weeklyRate - Tresholds.UEL.value });
      tresholdAmmounts.push({ code: 'PT', 'ammount': Tresholds.UEL.value - Tresholds.PT.value });
    } else {
      if (weeklyRate > Tresholds.PT.value) {
        tresholdAmmounts.push({ code: 'PT', 'ammount': weeklyRate - Tresholds.PT.value });
      }
    }

    const niAmmounts = _map(tresholdAmmounts, (treshold) => {
      return {
        employee: util.percentOf(treshold.ammount, Tresholds[treshold.code].employee),
        employer: util.percentOf(treshold.ammount, Tresholds[treshold.code].employer),
      };
    });

    return niAmmounts;

  }

  render() {
    const { weeklyRate } = this.props;
    const niAmmounts = this.calculateNI();

    const summedTresholds = {
      employee: _sumBy(niAmmounts, 'employee'),
      employer: _sumBy(niAmmounts, 'employer'),
    };

    return (
      <>
        <Header as='h2'>National Insurance: {util.financial(summedTresholds.employee + summedTresholds.employer)}/week</Header>
        <NationalInsuranceGrid
          weeklyRate={weeklyRate}
          summedTresholds={summedTresholds}
          niAmmounts={niAmmounts}
        />
      </>
    );
  }
}

export default NationalInsurance;
