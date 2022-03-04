// src/app/service/sanity.service.ts

import { Injectable } from '@angular/core';
import { client } from './client';


@Injectable({
  providedIn: 'root'
})
export class SanityService {

  sanityClientCredentials = client;

  async getProducts(): Promise<any[]> {
    return await this.sanityClientCredentials.fetch(
      `*[_type == "product"]{
        _id,
    title
  }`
    );
  }

  async getCategories(): Promise<any[]> {
    return await this.sanityClientCredentials.fetch(
      `*[_type == "category"]{
        _id,
        title,
        description
  }`
    );
  }
}
