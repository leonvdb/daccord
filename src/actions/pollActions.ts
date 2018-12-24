import { GET_POLL, CREATE_POLL, CLEAR_POLL_FROM_STATE } from './types';
import axios from 'axios';
import { INewPoll, ThunkResult, IPoll } from 'src/interfaces';
import { ActionCreator } from 'redux';
import { AppAction } from 'src/interfaces';

export const getPoll: ActionCreator<ThunkResult<IPoll>> = (pollId: string, queryParam: string) => async dispatch => {
    // TODO: Add Error handling for invalid id
    const res = await axios.get(`/api/polls/${pollId}${queryParam}`);
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