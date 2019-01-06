import axios from 'axios';
import { ActionCreator, Dispatch } from 'redux';
import { ThunkResult, IUser, INewParticipant, AppAction, IUserState } from 'src/interfaces';
import { getUserFromJwt } from 'src/utilities/setUserFromJwt';
import { SET_CURRENT_USER } from './types';
import { setError } from './errorActions';
import setAuthToken from 'src/utilities/setAuthToken';


export const participate: ActionCreator<ThunkResult<IUser>> = (newParticipant: INewParticipant) => async dispatch => {
    try {
        const res = await axios.post('/api/users/participate', newParticipant);
        return dispatch(setAuthTokenAndUser(res.data.token))
    } catch (error) {
        return dispatch(setError(error.response.data))
    }
}

export const setCurrentUser: ActionCreator<AppAction> = (user: IUserState) => {
    return {
        type: SET_CURRENT_USER,
        payload: user
    }
}

export const setAuthTokenAndUser: ActionCreator<AppAction> = (token: string) => {
    setAuthToken(token)
    const user = getUserFromJwt(token)
    return setCurrentUser(user)
}

export const resendLink: ActionCreator<any> = (pollId: string, email: string) => async (dispatch: Dispatch) => {
    try {
        const req = { pollId, email }
        const res = await axios.post('/api/users/accessLink', req)
        return {
            payload: res.data
        }
    } catch (error) {
        return dispatch(setError(error))
    }
}