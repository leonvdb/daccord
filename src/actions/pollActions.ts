import { GET_POLL, CREATE_POLL, CLEAR_POLL_FROM_STATE, SET_CURRENT_USER } from './types';
import axios from 'axios';
import { INewPoll, ThunkResult, IPoll } from 'src/interfaces';
import { ActionCreator } from 'redux';
import { AppAction, IUserState, IUserJwt } from 'src/interfaces';
import setAuthToken from '../utilities/setAuthToken';
import * as jwtDecode from 'jwt-decode';

export const getPoll: ActionCreator<ThunkResult<IPoll>> = (pollId: string, queryParam: string) => async dispatch => {
    // TODO: Add Error handling for invalid id
    const res = await axios.get(`/api/polls/${pollId}${queryParam}`);
    const { token } = res.data;
    if (token) {
        localStorage.setItem('jwtToken', token);
        setAuthToken(token);
        const decoded: IUserJwt = jwtDecode(token);
        const user = {
            accountLogin: decoded.accountLogin,
            pollId: decoded.pollId,
            userId: decoded.userId,
            userType: decoded.userType
        }
        dispatch(setCurrentUser(user))
    }
    return dispatch({
        type: GET_POLL,
        payload: res.data
    });
}

export const createPoll: ActionCreator<ThunkResult<IPoll>> = (poll: INewPoll) => async dispatch => {
    const res = await axios.post(`/api/polls`, poll)
    dispatch({
        type: CREATE_POLL,
        payload: res.data
    })
    return res.data
}

export const clearPollFromState: ActionCreator<AppAction> = () => {
    return {
        type: CLEAR_POLL_FROM_STATE
    }
}

export const setCurrentUser: ActionCreator<AppAction> = (user: IUserState) => {
    return {
        type: SET_CURRENT_USER,
        payload: user
    }
}