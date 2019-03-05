import { ActionCreator } from 'redux';
import { AppAction, IJwtPayload } from 'src/interfaces';
import { SET_CURRENT_USER } from './types';


export const setCurrentUser: ActionCreator<AppAction> = (user: IJwtPayload) => {
    return {
        type: SET_CURRENT_USER,
        payload: user
    }
}
