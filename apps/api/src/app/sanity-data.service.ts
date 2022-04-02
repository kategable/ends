
import { State } from './../../../../libs/api-interfaces/src/lib/state';
import { Calculation, Location, SourceProduct } from '@ends/api-interfaces';

import { Injectable, Logger } from '@nestjs/common';
import { client } from './service/client';

import locationData from '../assets/data/USCities.json';
import calculations from '../assets/data/caclculation.json';
import products from '../assets/data/products.json';
import statesData from '../assets/data/states.json';

@Injectable()
export class SanityDataService {
  sanityClientCredentials = client;
  logger: Logger;

  constructor() {
    this.logger = new Logger();
  }
  async getProducts() {
    return await this.sanityClientCredentials.fetch(
      `*[_type == "product"]{
        _id,
    title
  }`
    );
  }
  // async getProductbyId(id: string, clientId: string): Promise<SourceProduct> {
  //   return await this.sanityClientCredentials
  //     .getDocument('product-' + id)
  //     .then((product) => {

  //       return product;
  //     });
  // }
  getLocation(zip: number, state: string): Location[] {
    return (<Location[]>locationData).filter(
      (c) => c.zip_code === zip && c.state === state
    );
  }
  getCalculations(state) {
    return (<Calculation[]>calculations).filter((calc) => calc.state === state);
  }

  getSourceProduct(product: string) {
    //return this.getProductbyId(product);
    return (<SourceProduct[]>(<unknown>products)).find((prod) => {
      prod.SKU === product;
    });
  }
  async createLocations(cnt?: number): Promise<number> {
    //this is to load zipcode file
    const locations = <Location[]>locationData;
    const states = <State[]>statesData;
    if (!cnt) cnt = locations.length;
    this.logger.log(`cnt is ${cnt}`);
    let i = 0;
    for (let index = 0; index < cnt + 1; index++) {
      const location = locations[index];
      this.logger.log(`Location, zip is ${location.zip_code}`);

      const state = states.find((s) => s.code === location.state);
      if (!state) {
        this.logger.log(`State not found:  ${location.state}`);
      }
      const doc: Location = {
        _id: location.zip_code.toString(),
        _type: 'location',
        city: location.city,
        county: location.county,
        zip_code: location.zip_code,
        title: `${location.zip_code} - ${location.state} - ${location.county} - ${location.city}`,
        latitude: location.latitude,
        longitude: location.longitude,
        stateCode: location.state,
        state: state?.name,
      };

      await client
        .createOrReplace(doc)
        .then((res) => {
          this.logger.log(`Location was created, document ID is ${res._id}`);
          i++;
        })
        .catch((err) => {
          this.logger.error('Oh no, the update failed: ', err.message);
        });
    }
    return i;
  }
}
