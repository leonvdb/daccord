import { secretOrKey } from '../config/secrets';
import { IJwtPayloadData } from 'src/interfaces';
import * as jwt from 'jsonwebtoken';
import { ObjectId } from 'mongodb';
export function createJsonWebToken(userId: ObjectId, userType: string, isForLoggedInAccount: boolean, forPollId?: string): string {

    const jwtPayload: IJwtPayloadData = {
        userId: userId.toHexString(),
        isForLoggedInAccount,
    };

    if (!isForLoggedInAccount) {
        jwtPayload.forPollId = forPollId
    }
    //Sign JWT
    const JWT = jwt.sign(jwtPayload, secretOrKey, { expiresIn: "1d" });
    return "Bearer " + JWT;
}
