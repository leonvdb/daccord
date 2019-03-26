import { ActionCreator } from 'redux';
import {  AppAction, IVoteNew } from '../interfaces';
import { HANDLE_RATING_CHANGE, CLEAR_RATING_CHANGES } from './types';

export const handleRatingChange: ActionCreator<AppAction<IVoteNew>> = (optionId: string, rating: number) => {
    const payload = {
        optionId,
        rating
    }
    return {
        type: HANDLE_RATING_CHANGE,
        payload
    }
}

export const clearRatingChanges: ActionCreator<AppAction<void>> = () => {
    return {
        type: CLEAR_RATING_CHANGES
    }
}