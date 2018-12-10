import { GET_POLL, ADD_OPTION } from '../actions/types';

const initialState = {
    poll: {
        options: []
    }
};

export default function (state = initialState, action) {
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