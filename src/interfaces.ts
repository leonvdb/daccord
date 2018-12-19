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


//Backend Interfaces

export interface AppAction<TPayload = any> extends Action<string> {
    payload?: TPayload
    error?: string
}

export interface ThunkResult<TResultActionPayload> extends ThunkAction<Promise<AppAction<TResultActionPayload>>, Store, void, AppAction<TResultActionPayload>> { }
