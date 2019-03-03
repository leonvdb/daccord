import { CLEAR_POLL_FROM_STATE, SET_CURRENT_USER } from './types';
import axios from 'axios';
import { ThunkResult } from 'src/interfaces';
import { ActionCreator, Dispatch } from 'redux';
import { AppAction, IJwtPayload } from 'src/interfaces';
import { setError } from './errorActions';

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


