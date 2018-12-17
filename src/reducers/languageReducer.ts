import { SET_LANGUAGE } from '../actions/types';
import { AppAction } from 'src/interfaces';

export interface LanguageReducer {
    language: string
}

const initialState: LanguageReducer = {
    language: "English"
}

export default function (state = initialState, action: AppAction) {
    switch (action.type) {
        case SET_LANGUAGE:
            return {
                ...state,
                language: action.payload
            }
        default:
            return state;
    }
}