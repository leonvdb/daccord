import { Dispatch, ActionCreator } from 'redux';
import { IJwtPayload, AppAction, IUser, ThunkResult } from '../interfaces';
import { SET_JWT_TOKEN, SET_CURRENT_USER } from './types';
import setAuthToken from '../utilities/setAuthToken';
import { setError } from './errorActions';

// TODO set the user when the jwt is set, but where????
export function setAuthJwt(jwt: IJwtPayload): AppAction<IJwtPayload> {
    return {
        type: SET_JWT_TOKEN,
        payload: jwt
    }

}


export function setAuthTokenAndUser(user: IUser, jwt?: string): ThunkResult<IUser> {
    return async (dispatch: Dispatch) => {
        if(jwt) setAuthToken(jwt)
        try {
            return dispatch(setCurrentUser(user))
        } catch (error) {
            return dispatch(setError(error.response.data))
        }
    }
}

const setCurrentUser: ActionCreator<AppAction> = (user: IJwtPayload) => {
    return {
        type: SET_CURRENT_USER,
        payload: user
    }
}