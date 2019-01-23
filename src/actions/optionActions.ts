import axios from 'axios';
import { ActionCreator } from 'redux';
import { ThunkResult, IOption, INewOption } from 'src/interfaces';
import { ADD_OPTION, EDIT_OPTION, DELETE_OPTION } from './types';
import { setError } from './errorActions';
import { IApiResponse } from 'src/server/routes/api/responseInterfaces';

export const addOption: ActionCreator<ThunkResult<IOption>> = (option: IOption, pollId: string) => async dispatch => {
    try {
        const res = await axios.post<IApiResponse<IOption>>(`/api/polls/${pollId}/options`, option)
        return dispatch({
            type: ADD_OPTION,
            payload: res.data.payload
        })

    } catch (error) {
        return dispatch(setError(error))
    }
}

export const editOption: ActionCreator<ThunkResult<IOption>> = (option: INewOption, pollId: string, optionId: string) => async dispatch => {
    try {
        const res = await axios.put<IApiResponse<IOption>>(`/api/polls/${pollId}/options/${optionId}`, option)
        return dispatch({
            type: EDIT_OPTION,
            payload: res.data.payload
        })
    } catch (error) {
        return dispatch(setError(error))
    }
}

export const deleteOption: ActionCreator<ThunkResult<string>> = (pollId: string, optionId: string) => async dispatch => {
    try {
        // axios.delete has no return type 
        await axios.delete(`/api/polls/${pollId}/options/${optionId}`)
        return dispatch({
            type: DELETE_OPTION,
            payload: optionId
        })
    } catch (error) {
        return dispatch(setError(error))
    }
}