import { Module } from '@nestjs/common';
import { OracleService } from './listener.service';
import { ControllerModule } from '../convector/controllers.module';

@Module({
  imports: [
    ControllerModule,
  ],
  controllers: [
  ],
  providers: [
    OracleService,
  ],
})
export class OracleModule {}
