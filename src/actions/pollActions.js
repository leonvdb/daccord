import { GET_POLL } from './types';
import axios from 'axios';

export const getPoll = poll_id => async dispatch => {
    const res = await axios.get(`http://localhost:5000/api/polls/${poll_id}/`);
    dispatch({
        type: GET_POLL,
        payload: res.data
    });
}