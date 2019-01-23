/*
  Income Tax rates and bands 2018 to 2019
*/

const Tresholds = {
  PA: {
    name:  'Personal Allowance',
    value: 0,
    rate: 0,
    exception: /* You don’t get a Personal Allowance on taxable income over */ 123700,
  },
  BR: {
    name:  'Basic Rate',
    value: 11850,
    rate: 20,
  },
  HR: {
    name: 'Higher Rate',
    value: 46350,
    rate: 40,
  },
  AR: {
    name: 'Additional Rate',
    value: 150000,
    rate: 45,
  },
};

export default Tresholds;
