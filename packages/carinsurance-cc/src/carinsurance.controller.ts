import { ChaincodeTx } from '@worldsibu/convector-platform-fabric';
import {
  Controller,
  ConvectorController,
  Invokable,
  Param,
  ClientFactory
} from '@worldsibu/convector-core';
import * as yup from 'yup';
import { Carinsurance } from './carinsurance.model';

const channelName = 'ch1';
const chaincodeName = 'convoracle';

@Controller('carinsurance')
export class CarinsuranceController extends ConvectorController<ChaincodeTx> {
  @Invokable()
  public async create(
    @Param(yup.string())
    id: string,
    @Param(yup.string())
    name: string,
    @Param(yup.string())
    oracleResponseCode: string,
  ) {
    this.tx.stub.setEvent('oracle_request_data', { id, oracleResponseCode });

    const carinsurance = new Carinsurance(id);
    carinsurance.name = name;
    carinsurance.oracleResponseCode = oracleResponseCode;
    console.log('Pending to set [insuranceLevel] until oracle queries API');

    carinsurance.dateStartRequest = this.tx.stub.getTxDate().getTime();
    await carinsurance.save();
  }

  @Invokable()
  public async __callback(
    @Param(yup.string())
    oracleRespondeCode: string,
    @Param(yup.number())
    response: number,
  ) {
    if (!oracleRespondeCode) {
      throw new Error('missing [oracleRespondeCode]');
    }
    console.log('Callback received');
    const valueResponse = await Carinsurance.query(Carinsurance, {
      'selector': {
        'oracleResponseCode': oracleRespondeCode
      }
    });
    if (!valueResponse || !valueResponse[0] || !valueResponse[0].id) {
      throw new Error('No registry can be updated');
    }
    const model = new Carinsurance(valueResponse[0]);
    model.insuranceLevel = response;
    model.oracleResponseCode = '';
    model.dateOracleResponse = this.tx.stub.getTxDate().getTime();
    await model.save();
    console.log('[insuranceLevel] set after oracle response');
  }
}