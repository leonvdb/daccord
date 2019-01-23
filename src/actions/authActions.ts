import { Dispatch } from 'redux';
import { IJwtPayload, AppAction, IUser, ThunkResult } from '../interfaces';
import { SET_JWT_TOKEN } from './types';
import * as jwtDecode from 'jwt-decode';
import setAuthToken from '../utilities/setAuthToken';
import { setError } from './errorActions';
import { setCurrentUser } from './pollActions';
import axios from 'axios';

// TODO set the user when the jwt is set, but where????
export function setAuthJwt(jwt: IJwtPayload): AppAction<IJwtPayload> {
    return {
        type: SET_JWT_TOKEN,
        payload: jwt
    }

}

interface IGetUserResponse {
    message: string,
    payload: IUser
}

export function setAuthTokenAndUser(jwt: string, user?: IUser): ThunkResult<IUser> {
    return async (dispatch: Dispatch) => {
        setAuthToken(jwt)
        const decodedJwt: IJwtPayload = jwtDecode(jwt)
        try {
            // When jwt is from localstorage or store user as json in localstorage
            if (!user) {
                const response = await axios.get<IGetUserResponse>(`/api/users/${decodedJwt.userId}`)
                user = response.data.payload
            }
            dispatch(setAuthJwt(decodedJwt))
            return dispatch(setCurrentUser(user))
        } catch (error) {
            return dispatch(setError(error.response.data))
        }
    }
}
