import { CLEAR_ERROR, GET_ERRORS } from './types';
import { ActionCreator } from 'redux';
import { AppAction } from 'src/interfaces';

export const clearError: ActionCreator<AppAction> = (error: string) => {
    //TODO: Don't add dispatch here, but in MapDispatchToProps instead and Type properly
    return ({
        type: CLEAR_ERROR,
        payload: error
    })
}

export const setError: ActionCreator<AppAction> = (error: string) => {
    return ({
        type: GET_ERRORS,
        payload: error
    })
}