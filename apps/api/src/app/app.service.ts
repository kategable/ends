import { Injectable } from '@nestjs/common';
import { CartRequest, Message, Location } from '@ends/api-interfaces';
import { TaxService } from './tax.service';
import { SanityDataService } from './sanity-data.service';
// This import style requires "esModuleInterop", see "side notes"
@Injectable()
export class AppService {
  // constructor(private readonly dataService: SanityDataService) {}
  constructor(
    private readonly taxService: TaxService,
    private readonly dataService: SanityDataService
  ) {}
  //constructor(private readonly taxService: TaxService,private readonly dataService: SanityDataService) {}
  saveOrder(cartRequest: CartRequest): number {
    console.log('order saved', cartRequest);
    return 123;
  }
  async culculate(cartRequest: CartRequest): Promise<number> {
    console.log('cartRequest', cartRequest);
    const tax = await this.taxService.culculate(cartRequest);
    console.log('tax', tax);

    return tax;
  }
  getData(): Message {
    return { message: 'Welcome to api!' };
  }
  getProducts() {
    // return this.dataService.getProducts();
  }
  async loadLocations(): Promise<number> {
    return await this.dataService.createLocations();
  }

  async getLocations(): Promise<Location[]> {
    return await this.dataService.getLocations(60030);
  }
}
