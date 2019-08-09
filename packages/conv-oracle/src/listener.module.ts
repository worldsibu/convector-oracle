import { Module } from '@nestjs/common';
import { OracleService } from './listener.service';

@Module({
  imports: [
  ],
  controllers: [
  ],
  providers: [
    OracleService,
  ],
})
export class OracleModule {}
