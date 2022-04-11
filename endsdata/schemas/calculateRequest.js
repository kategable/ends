export default {
  name: 'calculateRequest',
  type: 'document',
  title: 'Tax Calculation Request',
  fields: [
    { name: 'data', type: 'string', title: 'Data' },
    { name: 'result', type: 'number', title: 'Tax' },
    {
      name: 'logs',
      title: 'Logs',
      type: 'array',
      of: [
        {
          type: 'string',
        },
      ],
    },
  ],
};
