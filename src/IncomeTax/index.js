import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _map from 'lodash/map';
import _sumBy from 'lodash/sumBy';

import Tresholds from './Tresholds';
import IncomeTaxGrid from './Grid';

import * as util from '../util.js';
import '../index.css';

import { Header } from 'semantic-ui-react'

class IncomeTax extends Component {
  static propTypes = {
    yearlyRate: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.props.onChange(_sumBy(this.calculateIncomeTax(), 'tax'));
  }

  componentDidUpdate(prevProps) {
  if (this.props.yearlyRate !== prevProps.yearlyRate) {
    this.props.onChange(_sumBy(this.calculateIncomeTax(), 'tax'));
  }
}

  calculateIncomeTax() {
    const { yearlyRate } = this.props;

    const checkPersonalAllowance = yearlyRate > Tresholds.PA.exception ? Tresholds.PA.value : Tresholds.BR.value;

    const tresholdAmmounts = [];

    if (yearlyRate > Tresholds.AR.value) {
      tresholdAmmounts.push({ code: 'BR', 'ammount': Tresholds.HR.value - checkPersonalAllowance });
      tresholdAmmounts.push({ code: 'HR', 'ammount': Tresholds.AR.value - Tresholds.HR.value });
      tresholdAmmounts.push({ code: 'AR', 'ammount': yearlyRate - Tresholds.AR.value });
    } else {
      if (yearlyRate > Tresholds.BR.value) {
        tresholdAmmounts.push({ code: 'BR', 'ammount': yearlyRate > Tresholds.HR.value ? Tresholds.HR.value - Tresholds.BR.value : yearlyRate - Tresholds.BR.value});
      }
      if (yearlyRate > Tresholds.HR.value) {
        tresholdAmmounts.push({ code: 'HR', 'ammount': yearlyRate - Tresholds.HR.value });
      }
    }

    const ammounts = _map(tresholdAmmounts, (treshold) => {
      return {
        tax: util.percentOf(treshold.ammount, Tresholds[treshold.code].rate),
        ...treshold
      };
    });

    return ammounts;
  }

  render() {
    const { yearlyRate } = this.props;

    const ammounts = this.calculateIncomeTax();
    const summedTresholds = _sumBy(ammounts, 'tax');

    return (
      summedTresholds > 0 && (
        <>
          <Header as='h2'>Income Tax: {util.financial(summedTresholds)}/year</Header>
          <IncomeTaxGrid
            yearlyRate={yearlyRate}
            summedTresholds={summedTresholds}
            ammounts={ammounts}
          />
        </>
      )
    );
  }
}

export default IncomeTax;
