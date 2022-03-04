import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common';

import { CartRequest, Message } from '@ends/api-interfaces';

import { AppService } from './app.service';
import { ApiBody } from '@nestjs/swagger';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('hello')
  getData(): Message {
    return this.appService.getData();
  }
  @ApiBody({ type: [CartRequest], description: "Returns ends-tax amount for a cart" })
  @Post("calculate")
  calculate(@Body() cartRequest: CartRequest) {
    return this.appService.culculate(cartRequest);
  }
  @ApiBody({type: [CartRequest],description: "Save order to ends"})
  @Post("save")
  saveOrder(@Body() cartRequest: CartRequest) {
    return this.appService.saveOrder(cartRequest);
  }
  @Get('products')
  getProducts(): any {
    return this.appService.getProducts();
  }


}
