import React from 'react';
import { Segment, Statistic } from 'semantic-ui-react'
import PropTypes from 'prop-types';
import * as util from '../util.js';

const NetPay = ({ weeklyRate, nationalInsurance, incomeTax, noWeeks }) => {
  const gross = weeklyRate * noWeeks;
  const net = gross - (nationalInsurance * noWeeks) - incomeTax;

  return (
    <Segment className='netPay'>
      <Statistic size='small'>
        <Statistic.Value>{util.financial(gross)}</Statistic.Value>
        <Statistic.Label>GROSS Pay</Statistic.Label>
      </Statistic>
      <Statistic size='small' color='green'>
        <Statistic.Value>{util.financial(net)}</Statistic.Value>
        <Statistic.Label>NET Pay</Statistic.Label>
      </Statistic>
      <Statistic size='small'>
        <Statistic.Value>{util.financial(incomeTax)}</Statistic.Value>
        <Statistic.Label>Income Tax</Statistic.Label>
      </Statistic>
      <Statistic size='small'>
        <Statistic.Value>{util.financial(nationalInsurance * noWeeks)}</Statistic.Value>
        <Statistic.Label>National Insurance</Statistic.Label>
      </Statistic>
    </Segment>
  );
}

NetPay.propTypes = {
  nationalInsurance: PropTypes.number.isRequired,
  incomeTax: PropTypes.number.isRequired,
  weeklyRate: PropTypes.number.isRequired,
  noWeeks: PropTypes.number.isRequired,
};

export default NetPay;
