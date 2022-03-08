
import { Module } from '@nestjs/common';
import { SanityService } from './service/sanity.service';

@Module({
  imports: [],
  providers: [SanityService],
  exports:[SanityService]
})
export class DataSanityModule {}
