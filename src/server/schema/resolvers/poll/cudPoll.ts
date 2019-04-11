import { findOrCreateUser, findPoll } from '../../../utilities/dataBaseUtilities';
import { Poll } from '../../../models/Poll';
import { generateToken, createRefId } from '../../../utilities/cryptoGenerators';
import { sendConfirmMail } from '../../../utilities/sendConfirmMail';
import { createJsonWebToken } from '../../../utilities/createJsonWebToken';
import { IContext } from '../../../../interfaces';
import { authenticate } from '../../../utilities/authenticate';

export const createPoll = async (_: any, args: ICreatePollInput) => {

    const user = await findOrCreateUser(args.userEmail)
    const newPoll = new Poll({
        title: args.title,
        creator: user.id,
        description: args.description ? args.description : '',
        creatorPseudonym: args.userName,
        creatorToken: generateToken(),
        refId: createRefId()
    });
    const poll = await newPoll.save()
    user.polls.push(poll._id)
    await user.save()

    sendConfirmMail(user.email, poll, 'createNewPoll', poll.creatorToken)
    const token = createJsonWebToken(poll.creator, 'CREATOR', false, poll.refId)
    return { poll, token, user, pseudonym: args.userName }
}

export const updatePoll = async (_: any, args: IUpdatePollInput, context: IContext) => {
    const poll = await findPoll(args.pollId)
    authenticate(context.user, poll.creator.toString())
    if (args.title) poll.title = args.title
    if (args.description) poll.description = args.description;
    return await poll.save();
}

export const deletePoll = async (_: any, args: IDeletePollInput, context: IContext) => {
    const poll = await findPoll(args.pollId)
    authenticate(context.user, poll.creator.toString())
    poll.remove()
    return true
}

interface ICreatePollInput {
    userEmail: string,
    title: string
    description?: string,
    userName: string
}
interface IUpdatePollInput {
    pollId: string,
    title?: string,
    description?: string
}

interface IDeletePollInput {
    pollId: string
}