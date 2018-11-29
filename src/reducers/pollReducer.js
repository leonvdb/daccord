import { GET_POLL } from '../actions/types';

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
        default:
            return state;
    }
}