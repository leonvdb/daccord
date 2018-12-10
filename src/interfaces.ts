import { Action } from 'redux';

export interface IPoll extends NewPoll {
    ref_id?: string
    creator: User
    options: Options[]
}

export interface NewPoll {
    title: string,
    email: string
}

export interface Options {
    title: string
    ref_id: string
    description: string
    votes: Votes[]
}

export interface Votes {
    voter: User
    vote: number
}

export interface User {
    email: string
    name: string
    password: string
    registered: boolean
    polls: IPoll
}


export interface AppAction<TPayload = any> extends Action<string> {
    payload?: TPayload
    error?: string
}
