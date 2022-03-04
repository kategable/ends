import { Injectable } from '@nestjs/common';
import { CartRequest, Message } from '@ends/api-interfaces';

import * as cities from '../assets/data/USCities.json';
// This import style requires "esModuleInterop", see "side notes"
@Injectable()
export class AppService {
  // constructor(private readonly dataService: SanityService) {}
  saveOrder(cartRequest: CartRequest): number {
    console.log('order saved', cartRequest);
    return 123;
  }
  culculate(cartRequest: CartRequest): any {
    console.log('tax calculated', cities);
    const cityCollection: any[] = cities as any[];

    const found = cityCollection.find(c=>c.zip_code === cartRequest.shipping.zipCode && c.state === cartRequest.shipping.zipCode);
    return found;
  }
  getData(): Message {
    return { message: 'Welcome to api!' };
  }
  getProducts() {
    // return this.dataService.getProducts();
  }
}
