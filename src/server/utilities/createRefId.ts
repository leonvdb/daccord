import { v4 as uuid } from 'uuid';
import * as bs58 from 'bs58';

export default function createRefId() {

    const cleanUuid = (uuid().replace(/-/g, ''));
    const buf = Buffer.from(cleanUuid, 'hex')
    const uuidB58 = bs58.encode(buf);

    return uuidB58
}
