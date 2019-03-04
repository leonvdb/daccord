import { VOTE_FOR_POLL_REQUEST, VOTE_FOR_POLL_SUCCESS, VOTE_FOR_POLL_FAILURE } from '../actions/types';
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

