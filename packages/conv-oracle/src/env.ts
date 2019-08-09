import * as dotenv from 'dotenv';
dotenv.config();
import * as os from 'os';
const homedir = os.homedir();

export const l = console.log;
export const externalURL = process.env.EXTERNAL_URL || 'http://demo0748406.mockable.io/bankapi';

export const chaincode = process.env.CHAINCODE || 'carinsurance';
export const channel = process.env.CHANNEL || 'ch1';
export const oracleEventToListen = process.env.CHANNEL || 'oracle_request_data';

export const organization = process.env.ORG || 'org1';
export const user = process.env.IDENTITY || 'user1';

export const keyStore = process.env.KEYSTORE || `/${homedir}/hyperledger-fabric-network/.hfc-${organization}`;
export const networkProfile = process.env.NETWORKPROFILE ||
    `/${homedir}/hyperledger-fabric-network/network-profiles/${organization}.network-profile.yaml`;
