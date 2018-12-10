import { combineReducers } from 'redux';
import pollReducer, { PollReducer } from './pollReducer';

export interface Store {
    poll: PollReducer
}

export default combineReducers({
    poll: pollReducer
})