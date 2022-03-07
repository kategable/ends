import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TaxService } from './tax.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService,TaxService],
})
export class AppModule {}
