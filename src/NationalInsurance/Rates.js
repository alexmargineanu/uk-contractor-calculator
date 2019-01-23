/*
  Class 1 National Insurance rates
  Employee (primary) contribution rates
*/

const Rates = [
  {
    description: 'Earnings at or above LEL up to and including PT',
    from: 'LEL',
    to: 'PT',
    rate: { employee: 0, employer: 0 },
  },
  {
    description: 'Earnings above the PT up to and including UEL',
    from: 'PT',
    to: 'UEL',
    rate: { employee: 12, employer: 13.8 },
  },
  {
    description: 'Balance of earnings above UEL',
    from: 'UEL',
    to: null,
    rate: { employee: 2, employer: 13.8 },
  },
];

export default Rates;
