import { SET_LANGUAGE } from '../actions/types';
import { AppAction } from '../interfaces';

export interface LanguageReducer {
    languageLabel: string
}

const initialState: LanguageReducer = {
    languageLabel: "English"
}

export default function (state = initialState, action: AppAction) {
    switch (action.type) {
        case SET_LANGUAGE:
            return {
                ...state,
                languageLabel: action.payload
            }
        default:
            return state;
    }
}