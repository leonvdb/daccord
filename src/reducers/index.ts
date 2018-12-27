import { combineReducers } from 'redux';
import pollReducer, { PollReducer } from './pollReducer';
import userReducer, { UserReducer } from './userReducer';
import languageReducer, { LanguageReducer } from './languageReducer';
import errorReducer from './errorReducer';

export interface Store {
    poll: PollReducer
    user: UserReducer
    language: LanguageReducer
    errors: string[]
}

export default combineReducers({
    poll: pollReducer,
    user: userReducer,
    language: languageReducer,
    errors: errorReducer
})