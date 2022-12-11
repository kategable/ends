import { Body, Controller, Get, Param, Post, Query, Req } from '@nestjs/common';

import { CartRequest, Message } from '@ends/api-interfaces';

import { AppService } from './app.service';
import { ApiBody, ApiCreatedResponse, ApiOkResponse, ApiResponse } from '@nestjs/swagger';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('hello')
  getData(): Message {
    return this.appService.getData();
  }

  @ApiResponse({ status: 201, description: 'Ends excise tax culculation' })
  @ApiBody({
    type: CartRequest,
    description: 'Returns ends-tax amount for a cart',
  })
  @Post('calculate')
  calculate(@Body() cartRequest: CartRequest) {
    return this.appService.culculate(cartRequest);
  }
  @ApiBody({ type: [CartRequest], description: 'Save order to ends' })
  @Post('save')
  saveOrder(@Body() cartRequest: CartRequest) {
    return this.appService.saveOrder(cartRequest);
  }
  @Get('products')
  async getProducts() {
    return await this.appService.getProducts();
  }

  @Get('locations')
  async loadLocations() {
    return await this.appService.getLocations();
  }

  @Get('states')
  async getStates() {
    return await this.appService.getStates();
  }
  @Get('calc/:id')
  async calc(@Param('id') id: string): Promise<any> {
    return await this.appService.getTaxDescription(id);
  }
}
