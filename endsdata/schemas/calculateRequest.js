export default {
  name: 'calculateRequest',
  type: 'document',
  title: 'Tax Calculation Request',
  fields: [
    { name: 'title', type: 'string', title: 'Request Title' },
    { name: 'clientId', type: 'string', title: 'Client Id' },
    { name: 'data', type: 'text', title: 'Data' },
    { name: 'result', type: 'number', title: 'Tax' },
    {
      name: 'logs',
      title: 'Logs',
      type: 'array',
      of: [
        {
          type: 'text',
        },
      ],
    },
  ],
};
