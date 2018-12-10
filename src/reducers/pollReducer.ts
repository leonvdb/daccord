import { GET_POLL, ADD_OPTION } from '../actions/types';
import { IPoll, User, Options, AppAction } from 'src/interfaces';

export interface PollReducer {
    poll: IPoll
}

// TODO fix
class Poll implements IPoll {
    title: string
    email: string
    ref_id: string
    creator: User
    options: Options[]

}


const initialState: PollReducer = {
    poll: new Poll
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
        default:
            return state;
    }
}

