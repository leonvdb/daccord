import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { Store } from './reducers';
import { ObjectId } from 'mongodb';


//Poll Interfaces

//TODO: Adapt creator to be typed as ObjectId
export interface IPoll extends INewPoll {
    refId?: string
    creator: string
    options: IOption[]
}

export interface INewPoll {
    title: string
    email: string
}


export interface IOption extends INewOption {
    creator: ObjectId
    refId: string
    votes: IVote[]
}

export interface INewOption {
    title: string
    description?: string
}

export interface IVote {
    voter: ObjectId
    vote: number
}


//User Interfaces

export interface IUser {
    email: string
    name: string
}

export interface IUserState {
    accountLogin: boolean,
    pollId: string,
    userId: string,
    userType: string
}

export interface IUserJwt extends IUserState {
    exp: number
    iat: number
}


//Backend Interfaces

export interface IJwtPayload {
    userId: ObjectId,
    userType: string,
    accountLogin: boolean,
    pollId: string
}

export interface AppAction<TPayload = any> extends Action<string> {
    payload?: TPayload
    error?: string
}

export interface ThunkResult<TResultActionPayload> extends ThunkAction<Promise<AppAction<TResultActionPayload>>, Store, void, AppAction<TResultActionPayload>> { }
