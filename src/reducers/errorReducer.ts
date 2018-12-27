import { GET_ERRORS } from '../actions/types';
import { AppAction } from 'src/interfaces';

const initialState: string[] = []

export default function (state = initialState, action: AppAction) {
    switch (action.type) {
        case GET_ERRORS:
            return [action.payload]
        default:
            return state;
    }
}