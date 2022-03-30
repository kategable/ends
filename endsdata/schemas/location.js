export default {
  name: 'locations',
  type: 'document',
  title: 'Location',
  fields: [
    { name: 'stateName', type: 'string', title: 'State Name' },
    { name: 'stateCode', type: 'string', title: 'State Code' },
    { name: 'zip_code', type: 'number', title: 'ZipCode' },
    { name: 'city', type: 'string', title: 'City' },
    { name: 'county', type: 'string', title: 'County' },
    { name: 'latitude', type: 'number', title: 'Latitude' },
    { name: 'longitude', type: 'number', title: 'Longitude' },
  ],
};
