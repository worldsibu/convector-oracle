// tslint:disable:no-unused-expression
import { join } from 'path';
import { expect } from 'chai';
import * as uuid from 'uuid/v4';
import { MockControllerAdapter } from '@worldsibu/convector-adapter-mock';
import { ClientFactory, ConvectorControllerClient } from '@worldsibu/convector-core';
import 'mocha';

import { Carinsurance, CarinsuranceController } from '../src';

describe('Carinsurance', () => {
  let adapter: MockControllerAdapter;
  let carinsuranceCtrl: ConvectorControllerClient<CarinsuranceController>;
  
  before(async () => {
    // Mocks the blockchain execution environment
    adapter = new MockControllerAdapter();
    carinsuranceCtrl = ClientFactory(CarinsuranceController, adapter);

    await adapter.init([
      {
        version: '*',
        controller: 'CarinsuranceController',
        name: join(__dirname, '..')
      }
    ]);
  });
  
  it('should create a default model', async () => {
    const modelSample = new Carinsurance({
      id: uuid(),
      name: 'Test',
      created: Date.now(),
      modified: Date.now()
    });

    await carinsuranceCtrl.create(modelSample);
  
    const justSavedModel = await adapter.getById<Carinsurance>(modelSample.id);
  
    expect(justSavedModel.id).to.exist;
  });
});