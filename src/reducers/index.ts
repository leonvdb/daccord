import { combineReducers } from 'redux';
import pollReducer, { PollReducer } from './pollReducer';
import userReducer, { UserReducer } from './userReducer';
import languageReducer, { LanguageReducer } from './languageReducer';
import errorReducer from './errorReducer';
import voteReducer, { VoteReducer } from './voteReducer';
import participantReducer, {ParticipantReducer} from './participantReducer';

export interface Store {
    poll: PollReducer
    user: UserReducer
    language: LanguageReducer
    errors: string[]
    votes: VoteReducer
    participant: ParticipantReducer
}

export default combineReducers({
    poll: pollReducer,
    user: userReducer,
    language: languageReducer,
    errors: errorReducer,
    votes: voteReducer,
    participant: participantReducer

})