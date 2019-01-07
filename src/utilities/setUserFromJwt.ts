import { IUserJwt, IUserState } from 'src/interfaces';
import * as jwtDecode from 'jwt-decode';

export function getUserFromJwt(token: string): IUserState {
    const decoded: IUserJwt = jwtDecode(token);
    const user = {
        accountLogin: decoded.accountLogin,
        pollId: decoded.pollId,
        userId: decoded.userId,
        userType: decoded.userType
    };
    return user
}
