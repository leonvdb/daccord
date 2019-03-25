import { SET_PSEUDONYM } from '../actions/types';
import { AppAction } from 'src/interfaces';

export interface ParticipantReducer {
    pseudonym: string
}


const initialState: ParticipantReducer = {
    pseudonym: ''
};

export default function (state = initialState, action: AppAction) {
    switch (action.type) {

        case SET_PSEUDONYM:
            return {
                ...state,
                pseudonym: action.payload
            }
        default:
            return state;
    }
}

