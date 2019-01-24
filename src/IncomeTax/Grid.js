import React from 'react';
import { Progress, Message, Segment } from 'semantic-ui-react';
import _findIndex from 'lodash/findIndex';

import * as util from '../util.js';
import Tresholds from './Tresholds';

const IncomeTaxGrid = ( { yearlyRate, ammounts, summedTresholds }) =>
  <Segment>

    {yearlyRate < Tresholds.BR.value && (
      <Progress percent={0} color='pink' progress>
        {util.financial(0)} {Tresholds.PA.name} on first {util.financial(Tresholds.BR.value)}
      </Progress>
    )}

    {yearlyRate > Tresholds.BR.value && (
      <Progress percent={Tresholds.BR.rate} color='pink' progress active>
        {util.financial(ammounts[_findIndex(ammounts, ['code', 'BR'])].tax)} {Tresholds.BR.name} from {util.financial(yearlyRate > Tresholds.PA.exception ? Tresholds.PA.value : Tresholds.BR.value)} to {util.financial(yearlyRate < Tresholds.HR.value ? yearlyRate : Tresholds.HR.value)}
      </Progress>
    )}

    {yearlyRate > Tresholds.HR.value && (
      <Progress percent={Tresholds.HR.rate} color='purple' progress active>
        {util.financial(ammounts[_findIndex(ammounts, ['code', 'HR'])].tax)} {Tresholds.HR.name} from {util.financial(Tresholds.HR.value)} to {util.financial(yearlyRate < Tresholds.AR.value ? yearlyRate : Tresholds.AR.value)}
      </Progress>
    )}

    {yearlyRate > Tresholds.AR.value && (
      <Progress percent={Tresholds.AR.rate} color='violet' progress active>
        {util.financial(ammounts[_findIndex(ammounts, ['code', 'AR'])].tax)} {Tresholds.AR.name} from {util.financial(Tresholds.AR.value)} to {util.financial(yearlyRate)}
      </Progress>
    )}

    {yearlyRate > Tresholds.PA.exception && (
      <Message size='mini' color='red'>
        You don’t get a Personal Allowance on taxable income over £123,700
      </Message>
    )}

</Segment>

export default IncomeTaxGrid;
