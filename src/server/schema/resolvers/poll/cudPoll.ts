import { findOrCreateUser } from '../../../utilities/dataBaseUtilities';
import { Poll } from '../../../models/Poll';
import { generateToken, createRefId } from '../../../utilities/cryptoGenerators';
import { sendConfirmMail } from '../../../utilities/sendConfirmMail';
import { createJsonWebToken } from '../../../utilities/createJsonWebToken';
import { ApiResponse } from '../../../utilities/ApiResponse';

export const createPoll = async (_: any, args: ICreatePollInput) => {

    const user = await findOrCreateUser(args.userEmail)
    const newPoll = new Poll({
        title: args.title,
        creator: user.id,
        creatorToken: generateToken(),
        refId: createRefId()
    });
    const poll = await newPoll.save()
    user.polls.push(poll._id)
    await user.save()

    sendConfirmMail(user.email, poll, 'createNewPoll', poll.creatorToken)

    const token = createJsonWebToken(poll.creator, 'CREATOR', false, poll.refId)
    const response = new ApiResponse({
        poll,
        token,
        user
    })
    return response.payload;

}

export const updatePoll = async (_: any, args: IUpdatePollInput) => {
    const pollFields = {
        title: args.title
    }
    const poll = await Poll.findOneAndUpdate(
        { refId: args.pollId },
        pollFields,
        { new: true }
    )
    return poll;
}

export const deletePoll = async (_: any, args: IDeletePollInput) => {
    const poll = await Poll.findOneAndDelete({ refId: args.pollId })
    return poll ? true : false
}



interface ICreatePollInput {
    userEmail: string,
    title: string
}
interface IUpdatePollInput {
    pollId: string,
    title?: string
}

interface IDeletePollInput {
    pollId: string
}