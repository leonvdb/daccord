import { CLEAR_ERROR } from './types';
import { ActionCreator } from 'redux';
import { Dispatch } from 'redux';

export const clearError: ActionCreator<any> = (error: string) => (dispatch: Dispatch) => {
    //TODO: Don't add dispatch here, but in MapDispatchToProps instead
    return dispatch({
        type: CLEAR_ERROR,
        payload: error
    })
}