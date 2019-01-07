import { CLEAR_ERROR, SET_ERROR } from '../actions/types';
import { AppAction } from 'src/interfaces';

const initialState: string[] = []

export default function (state = initialState, action: AppAction) {
    switch (action.type) {
        case SET_ERROR:
            return [action.payload]
        case CLEAR_ERROR:
            const newState = state.filter(error => error !== action.payload)
            return [...newState];
        default:
            return state;
    }
}