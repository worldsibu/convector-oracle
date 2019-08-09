import { ChaincodeEvent } from 'fabric-client';

export interface CCEvent {
  event: ChaincodeEvent;
  blockNumber: number;
  txId: string;
  txStatus: string;
}
