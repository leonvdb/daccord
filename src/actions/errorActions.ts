import { CLEAR_ERROR, SET_ERROR } from './types';
import { ActionCreator } from 'redux';
import { AppAction } from '../interfaces';

export const clearError: ActionCreator<AppAction> = (error: string) => {
    //TODO: Don't add dispatch here, but in MapDispatchToProps instead and Type properly
    return ({
        type: CLEAR_ERROR,
        payload: error
    })
}

export const setError: ActionCreator<AppAction> = (error: string) => {
    return ({
        type: SET_ERROR,
        payload: error
    })
}