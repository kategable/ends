import { Controller, Get, Param, Req } from '@nestjs/common';

import { Message } from '@ends/api-interfaces';

import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('hello')
  getData(): Message {
    return this.appService.getData();
  }

  @Get('tax/:code/:zipCode/:productSku')
  //http://localhost:3333/api/tax/123/60032/asdasd
  getTax(@Param() code: string, @Param() zipCode:number, @Param() productSku: string): number {
    console.log({code}, {zipCode}, {productSku});

    return 15.99;
  }

  @Get(':id')
  findOne(@Param() params): string {
    console.log(params.id);
    return `This action returns a #${params.id}`;
  }
}
