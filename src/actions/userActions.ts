import axios from 'axios';
import { ActionCreator, Dispatch } from 'redux';
import { AppAction, IJwtPayload } from 'src/interfaces';
import { SET_CURRENT_USER } from './types';
import { setError } from './errorActions';
import { ApiResponse } from '../server/utilities/ApiResponse';


export const setCurrentUser: ActionCreator<AppAction> = (user: IJwtPayload) => {
    return {
        type: SET_CURRENT_USER,
        payload: user
    }
}

export const resendLink: ActionCreator<any> = (pollId: string, email: string) => async (dispatch: Dispatch) => {
    try {
        const req = { pollId, email }
        const res = await axios.post<ApiResponse<null>>('/api/users/accessLink', req)
        // TODO no action is dispatched here 
        return {
            payload: res.data.message
        }
    } catch (error) {
        return dispatch(setError(error))
    }
}