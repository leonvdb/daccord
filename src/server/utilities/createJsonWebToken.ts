import { secretOrKey } from '../config/secrets';
import { IJwtPayload } from 'src/interfaces';
import * as jwt from 'jsonwebtoken';
import { ObjectId } from 'mongodb';
export function createJsonWebToken(userId: ObjectId, userType: string, accountLogin: boolean, pollId: string) {
    const payload: IJwtPayload = {
        userId,
        userType,
        accountLogin,
        pollId
    };
    //Sign JWT
    const JWT = jwt.sign(payload, secretOrKey, { expiresIn: "1d" });
    return "Bearer " + JWT;
}
