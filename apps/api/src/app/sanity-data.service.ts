import { Calculation, Location, SourceProduct } from '@ends/api-interfaces';

import { Injectable } from '@nestjs/common';
import { client } from './service/client';

import locationData from '../assets/data/USCities.json';
import calculations from '../assets/data/caclculation.json';
import products from '../assets/data/products.json';

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
}
