import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _map from 'lodash/map';
import _sum from 'lodash/sumBy';

import Tresholds from './Tresholds';

import * as util from '../util.js';
import '../index.css';

import { Progress, Grid, Segment, Header } from 'semantic-ui-react'

const IncomeTaxGrid = ( { dayRate, niAmmounts, summedTresholds }) =>
<>
  <IncomeTaxTresholds
    summedTresholds={summedTresholds}
    weeklyRate={dayRate * 5}
    niAmmounts={niAmmounts} />
</>

const NetPay = ({ summedTresholds, dayRate }) =>
<>
  <Segment>
    <Progress color='violet' percent={Math.floor((summedTresholds) * (100 / (dayRate * 5)))} progress>
      {Math.floor((summedTresholds) * (100 / (dayRate * 5)))}% of your gross pay goes to National Insurance
    </Progress>
  </Segment>
  <Header as='h2'>Net pay: {util.financial((dayRate * 5) - (summedTresholds))}/week ()</Header>
</>

const IncomeTaxTresholds = ( { weeklyRate, niAmmounts, summedTresholds, type }) =>
<Segment>
  <Header as='h3'>NI {type}: {util.financial(summedTresholds[type])}/week</Header>

  {weeklyRate > Tresholds.BR.value && weeklyRate < Tresholds.HR.value && (
    <Progress percent={Tresholds.BR[type]} color='violet' progress active>
      {util.financial(niAmmounts[0][type])} {Tresholds.BR.name} from £{Tresholds.BR.value} to £{weeklyRate}
    </Progress>
  )}

  {weeklyRate > Tresholds.HR.value && (
    <>
    <Progress percent={Tresholds.BR[type]} color='violet' progress active>
      {util.financial(niAmmounts[1][type])} {Tresholds.BR.name} from £{Tresholds.BR.value} to £{Tresholds.HR.value}
    </Progress>
    <Progress percent={Tresholds.HR[type]} color='purple' progress active>
      {util.financial(niAmmounts[0][type])} {Tresholds.HR.name} from £{Tresholds.HR.value} to {util.financial(weeklyRate)}
    </Progress>
    </>
  )}
</Segment>

class IncomeTax extends Component {
  static propTypes = {
    dayRate: PropTypes.number.isRequired,
  };

  render() {
    const { dayRate, noWeeks } = this.props;

    const yearlyRate = dayRate * 5 * noWeeks;
    const tresholdAmmounts = [];

    if (yearlyRate > Tresholds.HR.value) {
      tresholdAmmounts.push({ code: 'HR', 'ammount': yearlyRate - Tresholds.HR.value });
      tresholdAmmounts.push({ code: 'BR', 'ammount': Tresholds.HR.value - Tresholds.BR.value });
    } else {
      if (yearlyRate > Tresholds.BR.value) {
        tresholdAmmounts.push({ code: 'BR', 'ammount': yearlyRate - Tresholds.BR.value });
      }
    }

    const niAmmounts = _map(tresholdAmmounts, (treshold) => {
      return util.percentOf(treshold.ammount, Tresholds[treshold.code]);
    });

    const summedTresholds = _sum(niAmmounts);

    return (
      <>
        <Header as='h2'>Yearly gross: {util.financial(yearlyRate)}</Header>
        <Header as='h2'>Income Tax: {util.financial(summedTresholds)}/week</Header>
        <IncomeTaxGrid
          yearlyRate={yearlyRate}
          summedTresholds={summedTresholds}
          niAmmounts={niAmmounts}
        />
      </>
    );
  }
}

export default IncomeTax;
