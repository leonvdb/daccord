import { SET_CURRENT_USER } from '../actions/types';
import { AppAction, IUser } from '../interfaces';

export interface UserReducer {
    user: IUser
}


const initialState: UserReducer = {
    user: {
        id: '',
        email: '',
        name: ''
    },
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

