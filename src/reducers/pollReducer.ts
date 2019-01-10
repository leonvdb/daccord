import { GET_POLL, ADD_OPTION, CREATE_POLL, CLEAR_POLL_FROM_STATE, EDIT_OPTION, DELETE_OPTION, VOTE_FOR_POLL_REQUEST, VOTE_FOR_POLL_SUCCESS, VOTE_FOR_POLL_FAILURE } from '../actions/types';
import { IPoll, AppAction, IVote } from 'src/interfaces';

export interface PollReducer {
    poll: IPoll
}


const initialState: PollReducer = {
    poll: {
        title: '',
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
                poll: action.payload
            }
        case CLEAR_POLL_FROM_STATE:
            return {
                ...state,
                poll: initialState.poll
            }
        case VOTE_FOR_POLL_REQUEST:
            return {
                ...state,
                poll: state.poll.options.map(option => {
                    if (option.refId === action.payload.optionId) {
                        const vote: IVote = {
                            voter: action.payload.voterId,
                            rating: action.payload.rating
                        }
                        option.votes.push(vote)
                    }
                })
            }
        case VOTE_FOR_POLL_SUCCESS:
            // TODO confirm saving of vote
            return state
        case VOTE_FOR_POLL_FAILURE:
            // TODO message about fail of saving
            return state
        default:
            return state;
    }
}

