import { v4 as uuid } from 'uuid';
import * as bs58 from 'bs58';
import * as cryptoGenerators from './cryptoGenerators';

export function createRefId() {

    const cleanUuid = (uuid().replace(/-/g, ''));
    const buf = Buffer.from(cleanUuid, 'hex')
    const uuidB58 = bs58.encode(buf);

    return uuidB58
}

export function generateToken(): string {
    const createRefId = cryptoGenerators.createRefId
    const token = createRefId() + createRefId() + createRefId()
    return token
}