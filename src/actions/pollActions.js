import { GET_POLL, CREATE_POLL } from './types';
import axios from 'axios';

export const getPoll = pollId => async dispatch => {
    // Add Error handling for invalid id
    const res = await axios.get(`/api/polls/${pollId}/`);
    dispatch({
        type: GET_POLL,
        payload: res.data
    });
}

export const createPoll = poll => async dispatch => {
    const res = await axios.post(`/api/polls`, poll)
    dispatch({
        type: CREATE_POLL,
        payload: res.data
    })
    return res.data
}