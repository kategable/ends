import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common';

import { CartRequest, Message } from '@ends/api-interfaces';

import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('hello')
  getData(): Message {
    return this.appService.getData();
  }



  @Post("calculate")
  calculate(@Body() cartRequest: CartRequest) {
    return this.appService.culculate(cartRequest);
  }

  @Post("save")
  saveOrder(@Body() cartRequest: CartRequest) {
    return this.appService.saveOrder(cartRequest);
  }
}
