import axios from 'axios';
import { ActionCreator } from 'redux';
import { ThunkResult, IUser, INewParticipant } from 'src/interfaces';
import setUserFromJwt from 'src/utilities/setUserFromJwt';
import { SET_CURRENT_USER, GET_ERRORS } from './types';


export const participate: ActionCreator<ThunkResult<IUser>> = (newParticipant: INewParticipant) => async dispatch => {
    try {
        const res = await axios.post('/api/users/participate', newParticipant);
        setUserFromJwt(res.data.token, dispatch)
        //TODO: Return something that makes sense
        return {
            type: SET_CURRENT_USER,
            payload: res.data.user
        }
    } catch (error) {
        return dispatch({
            type: GET_ERRORS,
            payload: error.response.data
        })
    }
}  