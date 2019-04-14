import { IContext } from '../../../../interfaces';
import { findPoll, findOrCreateUser, isParticipating, findUserById, getParticipantPosition } from '../../../utilities/dataBaseUtilities';
import { generateToken } from '../../../utilities/cryptoGenerators';
import { sendConfirmMail } from '../../../utilities/sendConfirmMail';
import { createJsonWebToken } from '../../../utilities/createJsonWebToken';
import { AuthenticationError } from 'apollo-server-core';

export const createParticipant = async (_: any, args: ICreateParticipantInput, context: IContext) => {
    const poll = await findPoll(args.pollId);
    const user = await findOrCreateUser(args.email)
    let token = ''
    if (!isParticipating(poll, user.id)) {
        const AuthToken = generateToken()
        sendConfirmMail(user.email, poll, 'becomeNewParticipant', AuthToken)
        poll.participants.push({ id: user.id, token: AuthToken, pseudonym: args.pseudonym })
        user.polls.push(poll.id)
        await poll.save()
        await user.save()
        token = createJsonWebToken(user.id, 'PARTICIPANT', false, poll.refId)

    }
    return { user, token, pseudonym: args.pseudonym }
}

export const updateParticipant = async (_: any, args: IUpdateParticipantInput, context: IContext) => {
    const poll = await findPoll(args.pollId);
    const user = await findUserById(context.user.id)
    const participantIndex = getParticipantPosition(poll, user)
    if (participantIndex === -1) throw new AuthenticationError("Unauthorized")
    if (participantIndex === -2) {
        poll.creatorPseudonym = args.pseudonym
    } else {
        poll.participants[participantIndex].pseudonym = args.pseudonym
    }
    await poll.save();
    return args.pseudonym
}

export const deleteParticipant = async (_: any, args: IUpdateParticipantInput, context: IContext) => {
    const poll = await findPoll(args.pollId);
    const user = await findUserById(context.user.id)
    const participantIndex = getParticipantPosition(poll, user)
    if (participantIndex < 0) throw new AuthenticationError("Unauthorized")
    poll.participants.splice(participantIndex, 1)
    const filteredOptions = poll.options.filter(option => option.creator.toString() !== context.user.id.toString())
    filteredOptions.forEach(option => {
        option.votes.filter(vote => vote.voter.toString() !== context.user.id.toString())
    })
    poll.options = filteredOptions;
    await poll.save();
    return true
}

interface ICreateParticipantInput {
    email: string,
    pollId: string,
    pseudonym: string
}

interface IUpdateParticipantInput {
    pollId: string,
    pseudonym: string
}