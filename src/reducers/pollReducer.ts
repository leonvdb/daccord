import { GET_POLL, ADD_OPTION, CREATE_POLL, CLEAR_POLL_FROM_STATE, EDIT_OPTION, DELETE_OPTION } from '../actions/types';
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
                poll: action.payload.poll
            }
        case ADD_OPTION:
            return {
                ...state,
                poll: {
                    ...state.poll,
                    options: [action.payload, ...state.poll.options]
                }
            }
        case EDIT_OPTION:
            return {
                ...state,
                poll: {
                    ...state.poll,
                    options: state.poll.options.map(option => {
                        if (option.refId === action.payload.refId) {
                            return option = action.payload
                        } else {
                            return option
                        }
                    })
                }
            }
        case DELETE_OPTION:
            return {
                ...state,
                poll: {
                    ...state.poll,
                    options: state.poll.options.filter(option => option.refId !== action.payload)
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

