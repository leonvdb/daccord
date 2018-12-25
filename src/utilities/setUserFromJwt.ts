import { Dispatch } from 'redux';
import { IUserJwt } from 'src/interfaces';
import setAuthToken from './setAuthToken';
import { setCurrentUser } from '../actions/pollActions';
import * as jwtDecode from 'jwt-decode';

export default function setUserFromJwt(token: string, dispatch: Dispatch<any>) {
    localStorage.setItem('jwtToken', token);
    setAuthToken(token);
    const decoded: IUserJwt = jwtDecode(token);
    const user = {
        accountLogin: decoded.accountLogin,
        pollId: decoded.pollId,
        userId: decoded.userId,
        userType: decoded.userType
    };
    dispatch(setCurrentUser(user));
}
