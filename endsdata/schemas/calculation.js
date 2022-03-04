export default {
  name: 'calculation',
  type: 'document',
  title: 'ENDS Excise Tax Calculation',
  fields: [
    { name: 'state', type: 'string', title: 'State' },
    { name: 'city', type: 'string', title: 'City' },
    { name: 'county', type: 'string', title: 'County' },
    { name: 'hasTax', type: 'boolean', title: 'Apply Excite Tax' },
    { name: 'hasWholesaleRate', type: 'boolean', title: 'Charge Wholesale Rate' },
    { name: 'WholesaleRate', type: 'number', title: '% Wholesale Rate' },
    { name: 'hasFluidRate', type: 'boolean', title: 'Charge Per Fluid Rate' },
    { name: 'FluidRate', type: 'number', title: '% Per Fluid Rate' },
    { name: 'hasRetailRate', type: 'boolean', title: 'Charge Petail Rate' },
    { name: 'RetailRate', type: 'number', title: '% Retail Rate' },
  ],
};
