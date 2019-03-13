import { AppAction, IVoteNew } from 'src/interfaces';
import { HANDLE_RATING_CHANGE, CLEAR_RATING_CHANGES } from '../actions/types'

export interface VoteReducer {
    votes: IVoteNew[]
}


const initialState: VoteReducer = {
    votes: []
};

export default function (state = initialState, action: AppAction) {
    switch (action.type) {
        case HANDLE_RATING_CHANGE: 
            let newVote = true;
            const votes = state.votes.map(vote => {
                if (vote.optionId === action.payload.optionId) {
                    newVote = false
                    return {optionId: vote.optionId, rating: action.payload.rating}
                }
                return vote;
            })
            if (newVote) votes.push(action.payload)
            
            return {
                ...state,
                votes
            }
        case CLEAR_RATING_CHANGES:
            return {
                ...state,
                votes: []
            }
        default:
            return state;
    }
}

