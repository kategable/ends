export default {
  name: 'client',
  type: 'document',
  title: 'Clients',
  fields: [
    { name: 'title', type: 'string', title: 'Title' },
    { name: 'clientId', type: 'string', title: 'ClientId' },
    { name: 'address1', type: 'string', title: 'Address 1' },
    { name: 'address2', type: 'string', title: 'Address 2' },
    { name: 'city', type: 'string', title: 'City' },
    { name: 'zip_code', type: 'number', title: 'ZipCode' },
    { name: 'stateCode', type: 'string', title: 'State Code' },
    { name: 'valid', type: 'boolean', title: 'Current Customer' }
  ],
};
