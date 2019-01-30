import { ApiError } from '../../../utilities/ApiError';
import { Poll } from '../../../models/Poll';
import { createRefId } from '../../../utilities/cryptoGenerators';
import { findPoll, findOption } from '../../../utilities/dataBaseUtilities';

export const createOption = async (_: any, args: ICreateOptionInput) => {
    const poll = await Poll.findOne({ refId: args.pollId });
    if (!poll) return new ApiError("Poll not found", 404)
    const newOpt = {
        title: args.title,
        description: args.description,
        creator: args.userId,
        refId: createRefId(),
        votes: []
    };
    poll.options.unshift(newOpt);
    return await poll.save();
}

export const updateOption = async (_: any, args: IUpdateOptionInput) => {
    const poll = await findPoll(args.pollId);
    const { index, error } = findOption(poll, args.optionId);
    if (error) return new ApiError(error, 404);
    args.title && (poll.options[index].title = args.title);
    args.description && (poll.options[index].description = args.description);
    return await poll.save();
}

export const deleteOption = async (_: any, args: IDeleteOptionInput) => {
    const poll = await findPoll(args.pollId)
    const { index, error } = findOption(poll, args.optionId)
    if (error) return new ApiError(error, 404)
    poll.options.splice(index, 1);
    return await poll.save()
}

interface ICreateOptionInput {
    pollId: string
    userId: string
    title: string
    description?: string
}
interface IUpdateOptionInput {
    pollId: string
    optionId: string
    title?: string
    description?: string
}
interface IDeleteOptionInput {
    pollId: string
    optionId: string
}