import { SET_LANGUAGE } from './types';
import { ActionCreator, Action, AnyAction } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { Store } from '../reducers'

export const setLanguage: ActionCreator<ThunkAction<Action, Store, void, AnyAction>> = (language: string) => dispatch => {
    return dispatch({
        type: SET_LANGUAGE,
        payload: language
    })
}