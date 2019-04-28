import { secretOrKey } from '../config/secrets';
import { IJwtPayloadData } from '../../interfaces';
import * as jwt from 'jsonwebtoken';

export function createJsonWebToken(userId: string, userType: string, isForLoggedInAccount: boolean, forPollId?: string): string {
    const jwtPayload: IJwtPayloadData = {
        userId: userId.toString(),
        isForLoggedInAccount,
    };
    if (!isForLoggedInAccount) {
        jwtPayload.forPollId = forPollId
    }
    //Sign JWT
    const JWT = jwt.sign(jwtPayload, secretOrKey, { expiresIn: "1d" });
    return "Bearer " + JWT;
}
