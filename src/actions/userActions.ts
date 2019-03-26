import { ActionCreator } from 'redux';
import { AppAction, IJwtPayload } from 'src/interfaces';
import { SET_CURRENT_USER, SET_PSEUDONYM } from './types';


export const setCurrentUser: ActionCreator<AppAction> = (user: IJwtPayload) => {
    return {
        type: SET_CURRENT_USER,
        payload: user
    }
}

export const setPseudonym: ActionCreator<AppAction> = (pseudonym: string) => {
    return {
        type: SET_PSEUDONYM,
        payload: pseudonym
    }
}