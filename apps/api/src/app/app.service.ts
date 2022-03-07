import { Injectable } from '@nestjs/common';
import { CartRequest, Message } from '@ends/api-interfaces';
import { TaxService } from './tax.service';
// This import style requires "esModuleInterop", see "side notes"
@Injectable()
export class AppService {
  // constructor(private readonly dataService: SanityDataService) {}
  constructor(private readonly taxService: TaxService) {}
  //constructor(private readonly taxService: TaxService,private readonly dataService: SanityDataService) {}
  saveOrder(cartRequest: CartRequest): number {
    console.log('order saved', cartRequest);
    return 123;
  }
  culculate(cartRequest: CartRequest): number{
    console.log('cartRequest', cartRequest);
    const tax = this.taxService.culculate(cartRequest);
    return tax;
  }
  getData(): Message {
    return { message: 'Welcome to api!' };
  }
  getProducts() {
    // return this.dataService.getProducts();
  }
}
