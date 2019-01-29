import { findOrCreateUser } from '../../../utilities/dataBaseUtilities';
import { Poll } from '../../../models/Poll';
import { generateToken, createRefId } from '../../../utilities/cryptoGenerators';
import { sendConfirmMail } from '../../../utilities/sendConfirmMail';
import { createJsonWebToken } from '../../../utilities/createJsonWebToken';
import { ApiResponse } from '../../../utilities/ApiResponse';

interface createPollInput {
    userEmail: string,
    title: string
}

export const createPoll = async (_: any, args: createPollInput) => {

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