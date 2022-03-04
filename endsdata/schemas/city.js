export default {
  name: 'city',
  type: 'document',
  title: 'City',
  fields: [
    { name: 'zip_code', type: 'number', title: 'ZipCode' },
    { name: 'latitude', type: 'number', title: 'Latitude' },
    { name: 'longitude', type: 'number', title: 'Longitude' },
    { name: 'city', type: 'string', title: 'City' },
    { name: 'state', type: 'string', title: 'State' },
    { name: 'county', type: 'string', title: 'County' },
  ],
};
