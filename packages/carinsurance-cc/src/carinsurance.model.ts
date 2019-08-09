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

  // Value only set by the oracle
  @Validate(yup.number())
  public insuranceLevel: number;

  // Unique value to avoid exploit the __callback endpoint
  @Validate(yup.string())
  public oracleResponseCode: string;

  // Date when the tx is created
  @Validate(yup.number())
  public dateStartRequest: number;
  
  // Date when the oracle responds
  @Validate(yup.number())
  public dateOracleResponse: number;
}
