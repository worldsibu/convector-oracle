import { Observable, empty } from 'rxjs';
import { Injectable } from '@nestjs/common';
import { ChannelEventHub } from 'fabric-client';
import { ConvectorControllerClient, ControllerAdapter } from '@worldsibu/convector-core';
import { CarinsuranceController } from 'carinsurance-cc';
import { chaincode, channel, oracleEventToListen } from './env';

import { CCEvent } from './chaincode-event';

const l = console.log;

@Injectable()
export class OracleService {
    hub?: ChannelEventHub;
    initAdapter: Promise<void>;
    adapter: ControllerAdapter;
    animalCtrl: ConvectorControllerClient<CarinsuranceController>;

    constructor() {
        l('Initializing oracle service!');
        this.initAdapter.then(() => {
            if (!this.hub) {
                return empty();
            }
            l('Listening to oracle_request_data');

            Observable.create(observer => {
                this.hub.registerChaincodeEvent(
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
            }).subscribe(this.resolve.bind(this))
        });
        // this.subscriber(EditType.ANIMAL_ONORIGINSCAN).subscribe(this.resolveAndSave.bind(this));
    }

    resolve(event) {
        const rawData =
            JSON.parse(event.event.payload.toString('utf8'));

        l(rawData);
    }

}
