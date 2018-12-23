import { GET_POLL, ADD_OPTION, CREATE_POLL, CLEAR_POLL_FROM_STATE } from '../actions/types';
import { IPoll, AppAction } from 'src/interfaces';

export interface PollReducer {
    poll: IPoll
}


const initialState: PollReducer = {
    poll: {
        title: '',
        email: '',
        refId: '',
        creator: '',
        options: []
    }
};

export default function (state = initialState, action: AppAction) {
    switch (action.type) {
        case GET_POLL:
            return {
                ...state,
                poll: action.payload
            }
        case ADD_OPTION:
            return {
                ...state,
                poll: {
                    ...state.poll,
                    options: [action.payload, ...state.poll.options]
                }
            }
        case CREATE_POLL:
            return {
                ...state,
                poll: action.payload.poll
            }
        case CLEAR_POLL_FROM_STATE:
            return {
                ...state,
                poll: initialState.poll
            }
        default:
            return state;
    }
}

