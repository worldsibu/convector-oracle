import * as yup from 'yup';
import {
  ConvectorModel,
  Default,
  ReadOnly,
  Required,
  Validate
} from '@worldsibu/convector-core-model';

export class Carinsurance extends ConvectorModel<Carinsurance> {
  @ReadOnly()
  @Required()
  public readonly type = 'io.worldsibu.carinsurance';

  @Required()
  @Validate(yup.string())
  public name: string;

  @Validate(yup.number())
  public insuranceLevel: number;

  @Validate(yup.string())
  public oracleRespondeCode: string;
}
