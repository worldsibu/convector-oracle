import * as fs from 'fs';
import { resolve, join } from 'path';
import { Injectable } from '@nestjs/common';
import { ClientFactory } from '@worldsibu/convector-core';
import { FabricControllerAdapter } from '@worldsibu/convector-platform-fabric';

import { ConvectorControllers } from './controllers.interface';
import { keyStore, user, channel, chaincode, networkProfile, l } from '../env';
import { CarinsuranceController } from 'carinsurance-cc';

@Injectable()
export class FabricControllers extends ConvectorControllers {
  debugger;
  adapter = new FabricControllerAdapter({
    txTimeout: 300000,
    user,
    channel,
    chaincode,
    keyStore: resolve(__dirname, keyStore),
    networkProfile: resolve(__dirname, networkProfile),
  });

  initAdapter = this.adapter.init();

  controller = ClientFactory(CarinsuranceController, this.adapter);

  constructor() {
    super();

    const contextPath = resolve(__dirname, join(keyStore + '/' + user));
    fs.readFile(contextPath, 'utf8', async (err, data) => {
      if (err) {
        throw new Error(`Context in ${contextPath} doesn't exist. Make sure that path resolves to your key stores folder`);
      }

      l('Context path with cryptographic materials exists');
    });

    this.initAdapter.then(() => {
      const userPeer = this.adapter.channel.getPeers()
        .find(p => p.getMspid() === this.adapter.user.getIdentity().getMSPId());
      this.hub = this.adapter.channel.newChannelEventHub(userPeer.getPeer());
      this.hub.connect(true);
    });
  }
}
