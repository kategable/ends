import { Injectable } from '@nestjs/common';
import { CartRequest, Message } from '@ends/api-interfaces';

import cities from '../assets/data/USCities.json';
import calculations from '../assets/data/caclculation.json';
import products from '../assets/data/products.json';
import { throwError } from 'rxjs';
@Injectable()
export class TaxService {
  culculate(cartRequest: CartRequest): number {
    let tax = 0;
    //match address
    const found = (<any[]>cities).filter(
      (c) =>
        c.zip_code === cartRequest.shipping.address.zipCode &&
        c.state === cartRequest.shipping.address.state
    );
   // console.log('found address', found);
    //addres validation
    //check if CBDApp has this implemented
   // if (found.length === 0) throwError(() => 'no address found');
   if (found.length === 0){
    throwError(() => 'no address found');
   }
    //read calcs for this city
    const foundStateCalc = (<any[]>calculations).find(
      (calc) => calc.state === cartRequest.shipping.address.state
    );

    if (foundStateCalc === undefined) {
      return 0;
    }

    let check = false;
    if (foundStateCalc.county === undefined && foundStateCalc.city === undefined) {
      check = true;
    } else {
      if (foundStateCalc.city !== undefined) {
        console.log('found address', found);
        if (cartRequest.shipping.address.zipCode === foundStateCalc.city) {
          check = true;
        }
      }
      if (foundStateCalc.county !== undefined) {
        if (cartRequest.shipping.address.zipCode === foundStateCalc.county) {
          check = true;
        }else{
          console.log('cartRequest', cartRequest);
          console.log(foundStateCalc.county);
          console.log(foundStateCalc.city);
        }
      }
    }
    if (check === true) {
      console.log(foundStateCalc.hasTax);
      if (foundStateCalc.hasTax === true) {
        let productWholesalePrice = 0;//wholosaleRate from product.json;
        let productRetailPrice = 0;//shopify
        let productFluidWeight = 0 ;// json
        let quantity = 0;//shopify

          for(let product of products){
            productWholesalePrice+= product.defaultProductVariant.price * quantity;
            productRetailPrice+= pricefromShopify * quantity;
            productFluidWeight+= productLiquidWeight * quantity;
          }
        if (foundStateCalc.hasWholesaleRate) {
          tax = productWholesalePrice * foundStateCalc.WholesaleRate ;
          return tax;
        }
        if (foundStateCalc.hasFluidRate) {
          tax = productFluidWeight * foundStateCalc.FluidRate;
          return tax;
        }
        if (foundStateCalc.hasRetailRate ) {
          tax = productRetailPrice * foundStateCalc.RetailRate ;
          return tax;
        }
      } else {
        return 0;
      }
    } else {
      return 0;
    }
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
    // select product data from store(file) based on SKU and ShopId(TODO: add later)
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

    tax = cartRequest.cart.products[0].price; //not this but calculated
    return tax;
  }
}
