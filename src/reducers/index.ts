import { combineReducers } from 'redux';
import pollReducer, { PollReducer } from './pollReducer';
import languageReducer, { LanguageReducer } from './languageReducer';

export interface Store {
    poll: PollReducer
    language: LanguageReducer
}

export default combineReducers({
    poll: pollReducer,
    language: languageReducer
})