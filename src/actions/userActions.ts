import axios from 'axios';
import { ActionCreator, Dispatch } from 'redux';
import { ThunkResult, INewParticipant, AppAction, IJwtPayload } from 'src/interfaces';
import { SET_CURRENT_USER } from './types';
import { setError } from './errorActions';
import { setAuthTokenAndUser } from './authActions';
import { ApiResponse } from '../server/utilities/ApiResponse';
import { IPostUsersParticipate } from '../server/routes/api/responseInterfaces';


export const participate: ActionCreator<ThunkResult<IJwtPayload>> = (newParticipant: INewParticipant) => async dispatch => {
    try {
        const res = await axios.post<ApiResponse<IPostUsersParticipate>>('/api/users/participate', newParticipant);
        return dispatch(setAuthTokenAndUser(res.data.payload.token, res.data.payload.user))
    } catch (error) {
        return dispatch(setError(error.response.data))
    }
}

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