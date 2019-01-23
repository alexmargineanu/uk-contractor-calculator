import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _map from 'lodash/map';
import _sumBy from 'lodash/sumBy';

import Tresholds from './Tresholds';

import * as util from '../util.js';
import './index.css';
import '../index.css';

import { Progress, Grid, Segment, Header } from 'semantic-ui-react'

const NationalInsuranceGrid = ( { dayRate, niAmmounts, summedTresholds }) =>
<>
  <Grid divided columns={2}>
   <Grid.Column>
      <NationalInsuranceTresholds type="employee" summedTresholds={summedTresholds} weeklyRate={dayRate * 5} niAmmounts={niAmmounts} />
    </Grid.Column>
    <Grid.Column>
      <NationalInsuranceTresholds type="employer" summedTresholds={summedTresholds} weeklyRate={dayRate * 5} niAmmounts={niAmmounts} />
   </Grid.Column>
 </Grid>
</>

const NetPay = ({ summedTresholds, dayRate }) =>
<>
  <Segment>
    <Progress color='violet' percent={Math.floor((summedTresholds.employee + summedTresholds.employer) * (100 / (dayRate * 5)))} progress>
      {Math.floor((summedTresholds.employee + summedTresholds.employer) * (100 / (dayRate * 5)))}% of your gross pay goes to National Insurance
    </Progress>
  </Segment>
</>

const NationalInsuranceTresholds = ( { weeklyRate, niAmmounts, summedTresholds, type }) =>
<Segment>
  <Header as='h3'>NI {type}: {util.financial(summedTresholds[type])}/week</Header>

  {weeklyRate > Tresholds.PT.value && weeklyRate < Tresholds.UEL.value && (
    <Progress percent={Tresholds.PT[type]} color='violet' progress active>
      {util.financial(niAmmounts[0][type])} {Tresholds.PT.name} from £{Tresholds.PT.value} to £{weeklyRate}
    </Progress>
  )}

  {weeklyRate > Tresholds.UEL.value && (
    <>
    <Progress percent={Tresholds.PT[type]} color='violet' progress active>
      {util.financial(niAmmounts[1][type])} {Tresholds.PT.name} from £{Tresholds.PT.value} to £{Tresholds.UEL.value}
    </Progress>
    <Progress percent={Tresholds.UEL[type]} color='purple' progress active>
      {util.financial(niAmmounts[0][type])} {Tresholds.UEL.name} from £{Tresholds.UEL.value} to {util.financial(weeklyRate)}
    </Progress>
    </>
  )}
</Segment>

class NationalInsurance extends Component {
  static propTypes = {
    dayRate: PropTypes.number.isRequired,
  };

  render() {
    const { dayRate } = this.props;

    const weeklyRate = dayRate * 5;

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

    const summedTresholds = {
      employee: _sumBy(niAmmounts, 'employee'),
      employer: _sumBy(niAmmounts, 'employer'),
    };

    return (
      <>
        <Header as='h2'>National Insurance: {util.financial(summedTresholds.employee + summedTresholds.employer)}/week</Header>
        <NationalInsuranceGrid
          dayRate={dayRate}
          summedTresholds={summedTresholds}
          niAmmounts={niAmmounts}
        />
        <NetPay
          dayRate={dayRate}
          summedTresholds={summedTresholds}
          niAmmounts={niAmmounts}
        />
      </>
    );
  }
}

export default NationalInsurance;
