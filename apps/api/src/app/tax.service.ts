import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CartRequest, Calculation, Cart } from '@ends/api-interfaces';

import { SanityDataService } from './sanity-data.service';
@Injectable()
export class TaxService {
  logger: Logger;
  constructor(private readonly dataService: SanityDataService) {
    this.logger = new Logger();
  }
  culculate(cartRequest: CartRequest): number {
    let tax = 0;
    //match address
    const validLocation = this.dataService.getLocation(
      +cartRequest.shipping.address.zipCode,
      cartRequest.shipping.address.state
    );
    if (validLocation.length === 0) {
      throw new NotFoundException('no address found');
    }
    //read calcs for this state
    const foundStateCalcAll = this.dataService.getCalculations(
      cartRequest.shipping.address.state
    );
    const city = validLocation.at(0).city;
    const state = cartRequest.shipping.address.state;
    const county = validLocation[0].county;

    if (foundStateCalcAll.length === 0) {
      return 0;
    }
    foundStateCalcAll.map((calc) => {
      let isTaxable = false;
      if (calc.city === city) {
        //calculate tax for each product for city
        isTaxable = true;
      }
      if (calc.county === county) {
        //calculate tax for each product for county
        isTaxable = true;
      }
      if (calc.state === state) {
        //calculate tax for each product for state
        isTaxable = true;
      }
      if (isTaxable) {
        tax += this.getTax(calc, cartRequest.cart);
      }
    });
    return tax;
  }
  private getTax(calc: Calculation, cart: Cart): number {
    let tax = 0;

    if (!calc.hasTax && !calc.endsTaxable) return 0;

    cart.products.map((cartProduct) => {
      const sourceProduct = this.dataService.getSourceProduct(
        cartProduct.product
      );

      if (!sourceProduct.isTaxable) return;

      const productWholesalePrice =
        sourceProduct.defaultProductVariant.wholesalePrice;
      const productRetailPrice = cartProduct.price;
      const productFluidWeight =
        sourceProduct.defaultProductVariant.fluidWeight;
      const quantity = cartProduct.quanity;

      if (calc.hasWholesaleRate) {
        tax += calc.wholesaleRate * productWholesalePrice * quantity;
      }
      if (calc.hasRetailRate) {
        tax += calc.retailRate * productRetailPrice * quantity;
      }
      if (calc.hasFluidRate) {
        if (productFluidWeight) {
          tax += calc.fluidRate * productFluidWeight * quantity;
        }
      }
    });
    return tax;
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
  }
}
