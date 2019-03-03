import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { Store } from './reducers';
//Poll Interfaces

//TODO: Adapt creator to be typed as ObjectId
export interface IPoll {
    title: string
    refId: string
    creator: string
    options: IOption[]
}

export interface IPollQuery {
    title: string
    refId: string
    creator: IUser
    options: IOptionQuery[]
}

export interface INewPoll {
    title: string
    email: string
}


export interface IOptionQuery extends INewOption {
    creator: IUser
    refId: string
}

export interface IOption extends INewOption {
    creator: string
    refId: string
    votes: IVote[]
}

export interface INewOption {
    title: string
    description?: string
}

export interface IVote {
    voter: string
    rating: number
}

export interface IVoteForPollPayload {
    voterEmail: string
    optionId: string
    rating: number
}

// User Interfaces
export interface IUserInformation {
    email: string
    name?: string
}

export interface IUser extends IUserInformation {
    id: string
}

export interface INewParticipant extends IUserInformation {
    pollId: string
}

export interface IJwtPayloadData {
    userId: string
    forPollId?: string
    isForLoggedInAccount: boolean
}

export interface IJwtPayload extends IJwtPayloadData {
    exp: number // expiring
    iat: number // issuedAt
}

export interface IJwtPayloadUser {
    polls: string[]
    registered: boolean
    id: string
    email: string
}
export interface IContext {
    user: IJwtPayloadUser
}

export interface AppAction<TPayload = any> extends Action<string> {
    payload?: TPayload
    error?: string
}

export interface ThunkResult<TResultActionPayload> extends ThunkAction<Promise<AppAction<TResultActionPayload>>, Store, void, AppAction<TResultActionPayload>> { }
export interface LocalThunkResult<TResultActionPayload> extends ThunkAction<AppAction<TResultActionPayload>, Store, void, AppAction<TResultActionPayload>> { }
