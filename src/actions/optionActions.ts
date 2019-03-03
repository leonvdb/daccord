import axios from 'axios';
import { ActionCreator } from 'redux';
import { ThunkResult} from 'src/interfaces';
import { DELETE_OPTION } from './types';
import { setError } from './errorActions';

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