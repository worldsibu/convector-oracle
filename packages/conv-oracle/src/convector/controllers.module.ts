import { Module, Scope } from '@nestjs/common';

import { ConvectorControllers } from './controllers.interface';
import { FabricControllers } from './fabric-controllers.service';

@Module({
  providers: [
    {
      provide: ConvectorControllers,
      useClass: FabricControllers,
      scope: Scope.DEFAULT,
    },
  ],
  exports: [ConvectorControllers],
})
export class ControllerModule { }
