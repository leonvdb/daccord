import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { Store } from './reducers';
import { ObjectId } from 'mongodb';

export interface IPoll extends NewPoll {
    refId?: string
    creator: User
    options: Options[]
}

export interface NewPoll {
    title: string
    email: string
}

export interface NewOption {
    title: string
    description?: string
}

export interface Options extends NewOption {
    refId: string
    votes: Votes[]
}

export interface Votes {
    voter: ObjectId
    vote: number
}

export interface User {
    email: string
    name: string
}


export interface AppAction<TPayload = any> extends Action<string> {
    payload?: TPayload
    error?: string
}

export interface ThunkResult<TResultActionPayload> extends ThunkAction<Promise<AppAction<TResultActionPayload>>, Store, void, AppAction<TResultActionPayload>> { }
