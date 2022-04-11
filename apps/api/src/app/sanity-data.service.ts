
import { Location, SourceProduct, Calculation } from '@ends/api-interfaces';
import { Injectable, Logger } from '@nestjs/common';
import { client } from './service/client';

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
    title, sku
  }`
    );
  }

  async getLocations(zip: number): Promise<Location[]> {
    return await this.sanityClientCredentials.fetch(
      `*[_type=="location" && _id =='${zip}']`
    );
   //return  await this.sanityClientCredentials.getDocument(`location-${zip}`) as Location[];

    // return (<Location[]>locationData).filter(
    //   (c) => c.zip_code === zip
    // );
  }
  async getCalculations( state): Promise<Calculation[]> {
    return await this.sanityClientCredentials.fetch(
      `*[_type=="calculation" && state =='${state}']{
        city,hasFluidRate,hasRetailRate,hasTax,hasWholesaleRate,
        retailRate,state,
        title,year,wholesaleRate,fluidRate, categories[]->{ title}
      }`
    );
  }

  async getSourceProduct(product: string, clientId: string) {
      return await this.sanityClientCredentials.fetch(
      `*[_type == "product" && sku =='${product}' && clientId=='${clientId}']{
        _id,
    title, sku, taxable, wholeSalePrice, categories[]->{ title}
  }`
    );
  }
  async createLocations(cnt?: number): Promise<number> {
    //this is to load zipcode file
    // const locations = <Location[]>locationData;

    // const states = <State[]>statesData;
    // if (!cnt) cnt = locations.length;
    // this.logger.log(`cnt is ${cnt}`);
    const i = 0;
    // for (let index = 0; index < cnt + 1; index++) {
    //   const location = locations[index];
    //   this.logger.log(`Location, zip is ${location.zip_code}`);

    //   const state = states.find((s) => s.code === location.state);
    //   if (!state) {
    //     this.logger.log(`State not found:  ${location.state}`);
    //   }
    //   const doc: Location = {
    //     _id: location.zip_code.toString(),
    //     _type: 'location',
    //     city: location.city,
    //     county: location.county,
    //     zip_code: location.zip_code,
    //     title: `${location.zip_code} - ${location.state} - ${location.county} - ${location.city}`,
    //     latitude: location.latitude,
    //     longitude: location.longitude,
    //     stateCode: location.state,
    //     state: state?.name,
    //   };

    //   await client
    //     .createOrReplace(doc)
    //     .then((res) => {
    //       this.logger.log(`Location was created, document ID is ${res._id}`);
    //       i++;
    //     })
    //     .catch((err) => {
    //       this.logger.error('Oh no, the update failed: ', err.message);
    //     });
    // }
    return i;
  }
}
