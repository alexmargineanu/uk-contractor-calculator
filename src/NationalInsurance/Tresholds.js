/*
  Class 1 National Insurance thresholds 2018 to 2019
*/

const Tresholds = {
  LEL: {
    name:  'Lower Earnings Limit',
    value: 116,
    description: 'Earnings at or above LEL up to and including PT',
    employee: 0,
    employer: 0,
  },
  PT: {
    name:  'Primary Threshold',
    description: 'Earnings above the PT up to and including UEL',
    value: 162,
    employee: 12,
    employer: 13.8,
  },
  UEL: {
    name: 'Upper Earnings Limit',
    description: 'Balance of earnings above UEL',
    value: 892,
    employee: 2,
    employer: 13.8,
  },
};

export default Tresholds;
