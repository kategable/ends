
import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CartRequest, Calculation, SourceProduct } from '@ends/api-interfaces';

import { SanityDataService } from './sanity-data.service';
@Injectable()
export class TaxService {
  logger: Logger;
  constructor(private readonly dataService: SanityDataService) {
    this.logger = new Logger();
  }
  async culculate(cartRequest: CartRequest): Promise<number> {
    let tax = 0;
    //match address
    const validLocations = await this.dataService.getLocations(
      +cartRequest.shipping.address.zipCode
    );

    if (!validLocations?.length) {
      throw new NotFoundException('no address found');
    }
    //read calcs for this state
    const foundStateCalcAll = await this.dataService.getCalculations(
      validLocations.at(0).state
    );

    const city = validLocations.at(0).city;
    const state = validLocations.at(0).state;
    const county = validLocations.at(0).county;

    if (foundStateCalcAll.length === 0) {
      return 0;
    }
    foundStateCalcAll.map(async (calc) => {
      let isTaxable = false;
      let calcApplied = false;

      if (calc?.city === city) {
        //calculate tax for each product for city
        isTaxable = true;
        calcApplied = true;
      }
      calcApplied = calcApplied ? true : calc?.city?.length > 0;

      if (!calcApplied) {
        if (calc?.county === county && !isTaxable) {
          //calculate tax for each product for county
          isTaxable = true;
          calcApplied = true;
        }
      }
      calcApplied = calcApplied ? true : calc?.county?.length > 0;
      if (!calcApplied) {
        if (calc?.state === state && !isTaxable) {
          //calculate tax for each product for state
          isTaxable = true;
        }
      }
      if (isTaxable) {
        const sourceProducts = [];
        cartRequest.cart.products.forEach(async (cartProduct) => {
          //let tax = false;
          const ss = await this.dataService.getSourceProduct(
            cartProduct.product,
            cartRequest.clientId
          );
          const sourceProduct = ss.at(0);
          sourceProducts.push(sourceProduct);
        });
        tax += await this.getTax(calc, cartRequest, sourceProducts);
        console.log('tax', tax);
      }
    });
    return tax;
  }
  async getTax(
    calc: Calculation,
    cartRequest: CartRequest,
    sourceProducts: SourceProduct[]
  ): Promise<number> {
    let taxTotals = 0;

    if (!calc) return 0;
    if (!calc.hasTax) return 0;
    if (sourceProducts?.length === 0) return 0;

    sourceProducts.forEach(async (sourceProduct) => {
      //let tax = false;

      const product = cartRequest.cart.products.find(
        (p) => p.product === product.SKU
      );

      //TODO: need a category lookup
      // calc.catergories.forEach((category) => {
      //   if (sourceProduct.categories.includes(category)) {
      //     tax = true;
      //     return;
      //   }
      // });
      // if (!tax) return 0;

      const productWholesalePrice = sourceProduct.wholesalePrice | 0;
      const productRetailPrice = product.price;
      const productFluidWeight = sourceProduct.fluidWeight | 0;
      const quantity = product.quantity;

      if (calc.hasWholesaleRate) {
        taxTotals +=
          ((calc.wholesaleRate * productWholesalePrice) / 100) * quantity;
      }
      if (calc.hasRetailRate) {
        taxTotals += ((calc.retailRate * productRetailPrice) / 100) * quantity;
      }
      if (calc.hasFluidRate) {
        if (productFluidWeight) {
          taxTotals += ((calc.fluidRate * productFluidWeight) / 100) * quantity;
        }
      }
      console.log(taxTotals);
    });
    return taxTotals;
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
