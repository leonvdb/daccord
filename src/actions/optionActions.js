import axios from 'axios';
import { ADD_OPTION } from './types';

export const addOption = (option, poll_id) => async dispatch => {
    const res = await axios.post(`/api/polls/${poll_id}/options`, option)
    dispatch({
        type: ADD_OPTION,
        payload: res.data
    })
}