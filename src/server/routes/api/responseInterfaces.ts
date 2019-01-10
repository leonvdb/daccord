import { IUser, IPoll } from 'src/interfaces';

export interface IApiResponse<TPayload> {
    message: string
    payload: TPayload
}

export interface IPostUsersParticipate {
    user: IUser
    token: string
}

export interface IGetPolls {
    poll: IPoll
    token: string
    user: IUser
}

