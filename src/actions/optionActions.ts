import axios from 'axios';
import { ActionCreator } from 'redux';
import { ThunkResult, IPoll, IOption } from 'src/interfaces';
import { ADD_OPTION } from './types';
import { setError } from './errorActions';

export const addOption: ActionCreator<ThunkResult<IPoll>> = (option: IOption, pollId: string) => async dispatch => {
    try {
        const res = await axios.post(`/api/polls/${pollId}/options`, option)
        return dispatch({
            type: ADD_OPTION,
            payload: res.data
        })

    } catch (error) {
        return dispatch(setError(error))
    }
}