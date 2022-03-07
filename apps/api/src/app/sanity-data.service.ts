
import { Injectable } from '@nestjs/common';
import { client } from './service/client';

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
}
