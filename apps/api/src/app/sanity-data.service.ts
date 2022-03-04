import { Injectable } from '@angular/core';
import { client } from './service/client';
import { SanityService } from './service/sanity.service';

@Injectable({
  providedIn: 'root',
})
export class SanityDataService {
  sanityClientCredentials = client;

  constructor(private readonly service: SanityService) {

  }
  async getProducts() {
    return await this.sanityClientCredentials.fetch(
      `*[_type == "product"]{
        _id,
    title
  }`
    );
  }
}
