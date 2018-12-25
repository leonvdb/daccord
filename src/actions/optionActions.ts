import axios from 'axios';
import { ActionCreator } from 'redux';
import { ThunkResult, IPoll, IOption } from 'src/interfaces';
import { ADD_OPTION } from './types';
import setUserFromJwt from 'src/utilities/setUserFromJwt';

export const addOption: ActionCreator<ThunkResult<IPoll>> = (option: IOption, pollId: string) => async dispatch => {
    const res = await axios.post(`/api/polls/${pollId}/options`, option)
    if (res.data.token) {
        setUserFromJwt(res.data.token, dispatch)
    }
    return dispatch({
        type: ADD_OPTION,
        payload: res.data
    })
}