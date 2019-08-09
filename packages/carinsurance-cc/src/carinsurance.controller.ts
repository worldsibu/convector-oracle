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
    console.log('Callback sent');
    const valueResponse = await Carinsurance.query(Carinsurance, {
      'selector': {
        'oracleRespondeCode': oracleRespondeCode
      }
    });
    const model = new Carinsurance(valueResponse[0]);
    model.insuranceLevel = response;
    // clean oracleRespondeCode to avoid exploit twice
    model.oracleResponseCode = '';
    await model.save();
    console.log('[insuranceLevel] set after oracle response');
  }
}