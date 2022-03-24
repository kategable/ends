export default {
  name: 'calculation',
  type: 'document',
  title: 'ENDS Excise Tax Calculation',
  fields: [
    { name: 'state', type: 'string', title: 'State' },
    { name: 'city', type: 'string', title: 'City' },
    { name: 'county', type: 'string', title: 'County' },
    { name: 'hasTax', type: 'boolean', title: 'Apply Excite Tax' },
    { name: 'year', type: 'number', title: 'TAX YEAR - if blank all years will apply' },
    {
      name: 'hasWholesaleRate',
      type: 'boolean',
      title: 'Charge Wholesale Rate',
    },
    { name: 'wholesaleRate', type: 'number', title: '% Wholesale Rate' },
    { name: 'hasFluidRate', type: 'boolean', title: 'Charge Per Fluid Rate' },
    { name: 'fluidRate', type: 'number', title: '% Per Fluid Rate' },
    { name: 'hasRetailRate', type: 'boolean', title: 'Charge Retail Rate' },
    { name: 'retailRate', type: 'number', title: '% Retail Rate' },
    {
      name: 'categories',
      title: 'Product types to tax',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: {type: 'category'},
        },
      ],
    },
  ],
};
