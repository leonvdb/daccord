import axios from 'axios';
import { ADD_OPTION } from './types';

export const addOption = (option, pollId) => async dispatch => {
    const res = await axios.post(`/api/polls/${pollId}/options`, option)
    dispatch({
        type: ADD_OPTION,
        payload: res.data
    })
}