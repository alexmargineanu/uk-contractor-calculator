import React from 'react';
import { Segment, Progress } from 'semantic-ui-react'
import PropTypes from 'prop-types';
import * as util from '../util.js';

const NetPay = ({ weeklyRate, nationalInsurance, incomeTax, noWeeks }) => {
  const gross = weeklyRate * noWeeks;
  const net = gross - (nationalInsurance * noWeeks) - incomeTax;

  return (
    <Segment>
      {incomeTax > 0 && (
        <Progress color='pink' percent={Math.floor(incomeTax * (100 / gross))} progress>
          {util.financial(incomeTax)} of your gross pay goes to Income Tax
        </Progress>
      )}
      <Progress color='violet' percent={Math.floor(nationalInsurance * noWeeks * (100 / gross))} progress>
        {util.financial(nationalInsurance * noWeeks)} of your gross pay goes to National Insurance
      </Progress>
      <Progress color='green' percent={Math.ceil(net * (100 / gross))} progress>
        {util.financial(net)} NET pay
      </Progress>
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
