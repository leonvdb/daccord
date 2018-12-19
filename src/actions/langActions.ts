import { SET_LANGUAGE } from './types';
import { ActionCreator } from 'redux';
import { AppAction } from 'src/interfaces';

export const setLanguage: ActionCreator<AppAction> = (language: string) => {
    return {
        type: SET_LANGUAGE,
        payload: language
    }
}