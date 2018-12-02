const uuid4 = require('uuid4');
const bs58 = require('bs58');

function createRefId() {

    const clean_uuid = (uuid4().replace(/-/g, ''));
    const buf = Buffer.from(clean_uuid, 'hex')
    const uuid_b58 = bs58.encode(buf);

    return uuid_b58
}

module.exports = createRefId;