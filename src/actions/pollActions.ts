import { GET_POLL, CREATE_POLL, CLEAR_POLL_FROM_STATE, SET_CURRENT_USER, GET_ERRORS } from './types';
import axios from 'axios';
import { INewPoll, ThunkResult, IPoll } from 'src/interfaces';
import { ActionCreator, Dispatch } from 'redux';
import { AppAction, IUserState } from 'src/interfaces';
import { History } from 'history';
import { setAuthTokenAndUser } from './userActions';

export const getPoll: ActionCreator<ThunkResult<IPoll>> = (pollId: string, queryParam: string, history: History) => async dispatch => {
    // TODO: Add Error handling for invalid id
    const res = await axios.get(`/api/polls/${pollId}${queryParam}`);
    if (res.data.token) {
        dispatch(setAuthTokenAndUser(res.data.token))
        history.push(`/poll/${pollId}`)
    }
    return dispatch({
        type: GET_POLL,
        payload: res.data
    });
}

export const createPoll: ActionCreator<ThunkResult<IPoll>> = (poll: INewPoll) => async dispatch => {
    const res = await axios.post(`/api/polls`, poll)
    dispatch(setAuthTokenAndUser(res.data.token))
    dispatch({
        type: CREATE_POLL,
        payload: res.data
    })
    //TODO: WHy is this returning res.data? 
    return res.data
}


//TODO: Type properly
export const deletePoll: ActionCreator<any> = (pollId: string) => async (dispatch: Dispatch) => {
    try {
        await axios.delete(`/api/polls/${pollId}`)
        return {
            type: CLEAR_POLL_FROM_STATE
        }

    } catch (error) {
        return {
            type: GET_ERRORS,
            payload: error.response.data
        }
    }

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


