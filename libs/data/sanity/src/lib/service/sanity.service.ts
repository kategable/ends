// src/app/service/sanity.service.ts

import { Injectable } from '@angular/core';
import sanityClient from '@sanity/client';


const  YOUR_PROJECT_ID= "kmjcfpvs";
@Injectable({
  providedIn: 'root'
})
export class SanityService {

  sanityClientCredentials = {
    option: sanityClient({
      projectId: YOUR_PROJECT_ID,
      dataset: "production"
    })
  }


  async getProducts(): Promise<any[]> {
    return await this.sanityClientCredentials.option.fetch(
      `*[_type == "product"]{
        _id,
    title
  }`
    );
  }

  async getCategories(): Promise<any[]> {
    return await this.sanityClientCredentials.option.fetch(
      `*[_type == "category"]{
        _id,
        title,
        description
  }`
    );
  }
}
