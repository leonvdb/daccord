import { GET_POLL, CREATE_POLL } from './types';
import axios from 'axios';
import { NewPoll } from 'src/interfaces';

export const getPoll = (pollId: string) => async dispatch => {
    // TODO: Add Error handling for invalid id
    const res = await axios.get(`/api/polls/${pollId}/`);
    dispatch({
        type: GET_POLL,
        payload: res.data
    });
}

export const createPoll = (poll: NewPoll) => async dispatch => {
    const res = await axios.post(`/api/polls`, poll)
    dispatch({
        type: CREATE_POLL,
        payload: res.data
    })
    return res.data
}