import { ActionCreator } from 'redux';
import { ThunkResult, AppAction, IVoteForPollPayload } from '../interfaces';
import { setError } from './errorActions';
import axios from 'axios';
import { VOTE_FOR_POLL_REQUEST, VOTE_FOR_POLL_SUCCESS, VOTE_FOR_POLL_FAILURE } from './types';

export const voteForPoll: ActionCreator<ThunkResult<any>> = (rating: number, optionId: string) => async (dispatch, getState) => {
    const state = getState()
    const pollId = state.poll.poll.refId
    const voterId = state.user.user.id
    const userEmail = state.user.user.email
    try {
        dispatch(voteForPollRequest(userEmail, optionId, rating))
        const body = {
            userId: voterId,
            rating,
        }
        await axios.post(`/api/poll/${pollId}/vote`, body)
        return dispatch(voteForPollSuccess(userEmail, optionId, rating))
    } catch (error) {
        dispatch(voteForPollFailure(userEmail, optionId, rating))
        return dispatch(setError(error))
    }
}

const voteForPollRequest: ActionCreator<AppAction<IVoteForPollPayload>> = (
    voterEmail: string,
    optionId: string,
    rating: number,
) => {
    const payload = {
        voterEmail,
        optionId,
        rating,
    }
    return {
        type: VOTE_FOR_POLL_REQUEST,
        payload
    }
}

const voteForPollSuccess: ActionCreator<AppAction<IVoteForPollPayload>> = (
    voterEmail: string,
    optionId: string,
    rating: number
) => {
    const payload = {
        voterEmail,
        optionId,
        rating,
    }
    return {
        type: VOTE_FOR_POLL_SUCCESS,
        payload
    }
}

const voteForPollFailure: ActionCreator<AppAction<IVoteForPollPayload>> = (
    voterEmail: string,
    optionId: string,
    rating: number
) => {
    const payload = {
        voterEmail,
        optionId,
        rating,
    }
    return {
        type: VOTE_FOR_POLL_FAILURE,
        payload
    }
}