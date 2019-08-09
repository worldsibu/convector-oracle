import { Module } from '@nestjs/common';
import { OracleModule } from './oracle/listener.module';

@Module({
  imports: [
    OracleModule,
  ],
})
export class AppModule { }
