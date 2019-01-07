import axios from 'axios';
import { ActionCreator } from 'redux';
import { ThunkResult, IOption, INewOption } from 'src/interfaces';
import { ADD_OPTION, EDIT_OPTION } from './types';
import { setError } from './errorActions';

export const addOption: ActionCreator<ThunkResult<IOption>> = (option: IOption, pollId: string) => async dispatch => {
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

export const editOption: ActionCreator<ThunkResult<IOption>> = (option: INewOption, pollId: string, optionId: string) => async dispatch => {
    try {
        const res = await axios.put(`/api/polls/${pollId}/options/${optionId}`, option)
        return dispatch({
            type: EDIT_OPTION,
            payload: res.data
        })
    } catch (error) {
        return dispatch(setError(error))
    }
}