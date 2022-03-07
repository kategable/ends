import { Injectable } from '@nestjs/common';
import { CartRequest, Message } from '@ends/api-interfaces';

import cities from '../assets/data/USCities.json';
import calculations from '../assets/data/caclculation.json';
import { throwError } from 'rxjs';
@Injectable()
export class TaxService {
  culculate(cartRequest: CartRequest): number {
    console.log('cartRequest', cartRequest);
    let tax = 0;
    //match address
    const found = (<any[]>cities).filter(
      (c) =>
        c.zip_code === cartRequest.shipping.address.zipCode &&
        c.state === cartRequest.shipping.address.state
    );
    console.log('found address', found);
    //addres validation
    if (found.length === 0) throwError(()=>'no address found');

    //read calcs for this city
    const foundStateCalc = (<any[]>calculations).find(
      (calc) => calc.state === cartRequest.shipping.address.state
    );
    if (foundStateCalc.length > 0) {
      //1. loop through all foundStateCalc (state, city, county)
      //2. if no county and no city => goto #3
      //2.1 if has county
      //check if the cart.zipcode === foundStateCalc.county => goto #3
      //not found skip tax
      //if has city
      //check if the cart.zipcode === foundStateCalc.city => goto #3
      //not found skip tax
      //3. if hasTax === true
      // go through all products in cart
      // select product data from store
      //4. calculate tax based on product type
      //product.categories(has=>foundStateCalc.categories)
      // if hasWholesaleRate
      // calculation => product.rate * foundStateCalc.WholesaleRate
      // add to tax total
      // if hasFluidRate
      // calculation=> product.flOz * foundStateCalc.FluidRate
      // add to tax total
      // if hasRetailRate
      // calculation=>product.rate * foundStateCalc.RetailRate
      // add to tax total
    }
    tax = cartRequest.cart.products[0].price; //not this but calculated
    return tax;
  }
}
