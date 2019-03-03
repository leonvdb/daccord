import { CREATE_POLL, CLEAR_POLL_FROM_STATE, SET_CURRENT_USER } from './types';
import axios from 'axios';
import { INewPoll, ThunkResult, IPoll } from 'src/interfaces';
import { ActionCreator, Dispatch } from 'redux';
import { AppAction, IJwtPayload } from 'src/interfaces';
import { setError } from './errorActions';
import { setAuthTokenAndUser } from './authActions';
import { ApiResponse } from '../server/utilities/ApiResponse';
import { IGetPolls } from '../server/routes/api/responseInterfaces';



export const createPoll: ActionCreator<ThunkResult<IPoll>> = (poll: INewPoll) => async dispatch => {
    try {
        const res = await axios.post<ApiResponse<IGetPolls>>(`/api/polls`, poll)
        dispatch(setAuthTokenAndUser(res.data.payload.token, res.data.payload.user))
        return dispatch({
            type: CREATE_POLL,
            payload: res.data.payload.poll
        })
    } catch (error) {
        return dispatch(setError(error))
    }

}

export const deletePoll: ActionCreator<ThunkResult<void>> = (pollId: string) => async (dispatch: Dispatch) => {
    try {
        await axios.delete(`/api/polls/${pollId}`)
        return dispatch(clearPollFromState())
    } catch (error) {
        return dispatch(setError(error))
    }

}

export const clearPollFromState: ActionCreator<AppAction> = () => {
    return {
        type: CLEAR_POLL_FROM_STATE
    }
}

export const setCurrentUser: ActionCreator<AppAction> = (user: IJwtPayload) => {
    return {
        type: SET_CURRENT_USER,
        payload: user
    }
}


