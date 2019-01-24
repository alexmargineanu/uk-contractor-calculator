import React from 'react';
import { Grid, Progress, Header, Segment } from 'semantic-ui-react'
import * as util from '../util.js';
import Tresholds from './Tresholds';

const NationalInsuranceGrid = ( { ...props }) =>
<>
  <Grid divided columns={2}>
   <Grid.Column>
      <NationalInsuranceTresholds type="employee" {...props} />
    </Grid.Column>
    <Grid.Column>
      <NationalInsuranceTresholds type="employer" {...props} />
   </Grid.Column>
 </Grid>
</>


const NationalInsuranceTresholds = ( { weeklyRate, niAmmounts, summedTresholds, type }) =>
<Segment>
  <Header as='h3'>NI {type}: {util.financial(summedTresholds[type])}/week</Header>

  {weeklyRate > Tresholds.PT.value && weeklyRate < Tresholds.UEL.value && (
    <Progress percent={Tresholds.PT[type]} color='orange' progress active>
      {util.financial(niAmmounts[0][type])} {Tresholds.PT.name} from £{Tresholds.PT.value} to £{weeklyRate}
    </Progress>
  )}

  {weeklyRate > Tresholds.UEL.value && (
    <>
    <Progress percent={Tresholds.PT[type]} color='orange' progress active>
      {util.financial(niAmmounts[1][type])} {Tresholds.PT.name} from £{Tresholds.PT.value} to £{Tresholds.UEL.value}
    </Progress>
    <Progress percent={Tresholds.UEL[type]} color='yellow' progress active>
      {util.financial(niAmmounts[0][type])} {Tresholds.UEL.name} from £{Tresholds.UEL.value} to {util.financial(weeklyRate)}
    </Progress>
    </>
  )}
</Segment>

export default NationalInsuranceGrid;
