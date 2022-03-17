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
   // throwError(() => 'no address found');
    return 0;
   }
    //read calcs for this city
    const foundStateCalcAll = (<any[]>calculations).filter(
      (calc) => calc.state === cartRequest.shipping.address.state
    );

    if (foundStateCalcAll.length === 0) {
      return 0;
    }

    let foundStateCalc: any;
    let check = false;
    for(let foundState of found) {
      const foundStateCalcCity = (<any[]>foundStateCalcAll).find(
        (findcity) => 
          findcity.city === foundState.city 
      )
      if(foundStateCalcCity != undefined){
        if(foundStateCalcCity.hasTax){
          if(foundStateCalcCity.endsTaxable){
            check = true;
            foundStateCalc = foundStateCalcCity;
            break;
          }
        }
      }else{
        const foundStateCalcCounty = (<any[]>foundStateCalcAll).find(
          (findcity) => 
            findcity.county === foundState.county 
        )
        if(foundStateCalcCounty != undefined){
          if(foundStateCalcCounty.hasTax){
            if(foundStateCalcCounty.endsTaxable){
              check = true;
              foundStateCalc = foundStateCalcCounty;
              break;
            }
          }
        }
      }
    }
    //
     
    // console.log(check)
    // console.log(foundStateCalc);
    if (check) {
     // console.log(foundStateCalc.hasTax);
      if (foundStateCalc.hasTax) {
        let productWholesalePrice = 0; //wholosaleRate from product.json;
        let productRetailPrice = 0; //shopify
        let productFluidWeight = 0 ; // json
        let quantity = 0; //shopify
       // console.log(foundStateCalc);
       // console.log(cartRequest.shipping);
        console.log(cartRequest.cart.products);
        for(let product of cartRequest.cart.products){
         // console.log(product);
          quantity = product.quanity;
          productWholesalePrice+= products.defaultProductVariant.price * quantity;
          productRetailPrice+= product.price * quantity;
          productFluidWeight+= products.defaultProductVariant.fluidweight * quantity;
        }

        if (foundStateCalc.hasWholesaleRate) {
          tax = productWholesalePrice * foundStateCalc.WholesaleRate ;
          return tax;
        }
        if (foundStateCalc.hasFluidRate) {
          tax = productFluidWeight * foundStateCalc.FluidRate;
          return tax;
        }
        if (foundStateCalc.hasRetailRate) {
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
