import { State } from './../../../../libs/api-interfaces/src/lib/state';
import { Calculation, Location, SourceProduct } from '@ends/api-interfaces';

import { Injectable } from '@nestjs/common';
import { client } from './service/client';

import locationData from '../assets/data/USCities.json';
import calculations from '../assets/data/caclculation.json';
import products from '../assets/data/products.json';
import statesData from '../assets/data/states.json';

@Injectable()
export class SanityDataService {
  sanityClientCredentials = client;

  async getProducts() {
    return await this.sanityClientCredentials.fetch(
      `*[_type == "product"]{
        _id,
    title
  }`
    );
  }

  getLocation(zip: number, state: string): Location[] {
    return (<Location[]>locationData).filter(
      (c) => c.zip_code === zip && c.state === state
    );
  }
  getCalculations(state) {
    return (<Calculation[]>calculations).filter((calc) => calc.state === state);
  }

  getSourceProduct(product: string) {
    return (<SourceProduct[]>(<unknown>products)).find((prod) => {
      prod.SKU === product;
    });
  }
  createLocations(cnt: number) { //this is to load zipcode file
    const locations = <Location[]>locationData;
    const states = <State[]>statesData;
    for (let index = 0; index < cnt+1; index++) {
      const location = locations[index];
      const state = states.find(s=>s.code === location.state);
      const doc = {
        _id: location.zip_code.toString(),
        _type: 'location',
        city: location.city,
        county: location.county,
        zip_code: location.zip_code,
        latitude: location.latitude,
        longitude: location.longitude,
        stateCode: state,
        stateName: location.state,


      };

      client.createIfNotExists (doc).then((res) => {
        console.log(`Location was created, document ID is ${res._id}`);
      }).catch((err) => {
        console.error('Oh no, the update failed: ', err.message)
      });
      return;
    }
  }
}
