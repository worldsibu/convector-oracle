import { Injectable } from '@nestjs/common';
import { Observable, empty } from 'rxjs';
import { ChannelEventHub } from 'fabric-client';
import { ConvectorControllerClient, ControllerAdapter } from '@worldsibu/convector-core';
import { CarinsuranceController } from 'carinsurance-cc';
import { chaincode, channel, oracleEventToListen, l, externalURL } from '../env';

import { CCEvent } from './chaincode-event';
import { ConvectorControllers } from 'src/convector/controllers.interface';

import * as request from 'request-promise';


@Injectable()
export class OracleService {

    constructor(private cc: ConvectorControllers) {
        l('Initializing oracle service!');
        this.cc.initAdapter.then(() => {
            if (!this.cc.hub) {
                return empty();
            }
            l('Listening to oracle_request_data');

            Observable.create(observer => {
                this.cc.hub.registerChaincodeEvent(
                    chaincode,
                    oracleEventToListen,
                    (event, blockNumber, txId, txStatus) => observer.next({
                        event,
                        blockNumber,
                        txId,
                        txStatus,
                    }),
                    (err) => observer.error(err),
                    { filtered: false } as any,
                );
            }).subscribe(this.resolve.bind(this));
        });
        // this.subscriber(EditType.ANIMAL_ONORIGINSCAN).subscribe(this.resolveAndSave.bind(this));
    }

    async resolve(event) {
        const rawData =
            JSON.parse(event.event.payload.toString('utf8'));
        l('Got event requesting:');
        l(rawData);
        l('Querying external API for data');

        const resStr = JSON.parse(await request({
            uri: externalURL,
            method: 'POST',
        }));

        l(resStr);

        await this.cc.controller.__callback(rawData.oracleResponseCode, resStr.value);
        l('Querying external API for data');

    }

}
