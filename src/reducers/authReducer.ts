import { SET_JWT_TOKEN } from '../actions/types';
import { AppAction, IJwtPayload } from '../interfaces';

export interface AuthReducer {
    jwt: IJwtPayload
}


const initialState: AuthReducer = {
    jwt: {
        isForLoggedInAccount: false,
        forPollId: '',
        userId: '',
        exp: 0,
        iat: 0
    }
};

export default function (state = initialState, action: AppAction) {
    switch (action.type) {
        // write action creator
        case SET_JWT_TOKEN:
            return {
                ...state,
                jwt: action.payload
            }
        default:
            return state;
    }
}

