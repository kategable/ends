import { Injectable } from '@nestjs/common';
import { CartRequest, Message } from '@ends/api-interfaces';
// import { SanityService } from '@ends/data/sanity';

@Injectable()
export class AppService {
  // constructor(private readonly dataService: SanityService) {}
  saveOrder(cartRequest: CartRequest): number {
    console.log('order saved', cartRequest);
    return 123;
  }
  culculate(cartRequest: CartRequest): number {
    console.log('tax calculated', cartRequest);
    return 10.99;
  }
  getData(): Message {
    return { message: 'Welcome to api!' };
  }
  getProducts() {
    // return this.dataService.getProducts();
  }
  
}
