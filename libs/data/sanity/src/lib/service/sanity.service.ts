
import { Injectable } from '@nestjs/common';
import { from, Observable, of } from 'rxjs';
import { client } from './client';


@Injectable()
export class SanityService {

  sanityClientCredentials = client;

   getProducts():Observable<any[]> {
    return  from(this.sanityClientCredentials.fetch(
      `*[_type == "product"]{
        _id,
    title
  }`
    ));
  }

  // async getCategories(): Promise<any[]> {
  //   return await this.sanityClientCredentials.fetch(
  //     `*[_type == "category"]{
  //       _id,
  //       title,
  //       description
  // }`
  //   );
  // }
}
