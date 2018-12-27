import { SET_CURRENT_USER } from '../actions/types';
import { AppAction, IUserState } from 'src/interfaces';

export interface UserReducer {
    user: IUserState
}


const initialState: UserReducer = {
    user: {
        accountLogin: false,
        pollId: '',
        userId: '',
        userType: ''
    }
};

export default function (state = initialState, action: AppAction) {
    switch (action.type) {

        case SET_CURRENT_USER:
            return {
                ...state,
                user: action.payload
            }
        default:
            return state;
    }
}

