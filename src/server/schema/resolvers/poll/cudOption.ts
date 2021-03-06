import { createRefId } from '../../../utilities/cryptoGenerators';
import { findPoll, findOption } from '../../../utilities/dataBaseUtilities';
import { IContext } from '../../../../interfaces';
import { authenticate } from '../../../utilities/authenticate';

export const createOption = async (_: any, args: ICreateOptionInput) => {
    const poll = await findPoll(args.pollId);
    const newOpt = {
        title: args.title,
        description: args.description,
        creator: args.userId,
        refId: createRefId(),
        votes: []
    };
    poll.options.unshift(newOpt);
    const pollResult = await poll.save();
    return pollResult.options[0]
}

export const updateOption = async (_: any, args: IUpdateOptionInput, context: IContext) => {
    const poll = await findPoll(args.pollId);
    const { index, option } = findOption(poll, args.optionId);
    authenticate(context.user, option.creator.toString())
    if (args.title) poll.options[index].title = args.title;
    if (args.description) poll.options[index].description = args.description;
    const pollResult = await poll.save();
    return pollResult.options[index]
}

export const deleteOption = async (_: any, args: IDeleteOptionInput, context: IContext) => {
    const poll = await findPoll(args.pollId)
    const { index, option } = findOption(poll, args.optionId)
    authenticate(context.user, option.creator.toString())
    poll.options.splice(index, 1);
    await poll.save()
    return true
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