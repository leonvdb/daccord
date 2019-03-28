import { IContext } from '../../../../interfaces';
import { findPoll, findOrCreateUser, isParticipating } from '../../../utilities/dataBaseUtilities';
import { generateToken } from '../../../utilities/cryptoGenerators';
import { sendConfirmMail } from '../../../utilities/sendConfirmMail';
import { createJsonWebToken } from '../../../utilities/createJsonWebToken';

export const createParticipant = async (_: any, args: ICreateParticipantInput, context: IContext) => {
    const poll = await findPoll(args.pollId);
    const user = await findOrCreateUser(args.email)
    let token = ''
    const participantType = isParticipating(poll, user.id)
    if (!participantType){
        const AuthToken = generateToken()
        sendConfirmMail(user.email, poll, 'becomeNewParticipant', AuthToken)
        poll.participants.push({id: user.id, token: AuthToken, pseudonym: args.pseudonym })
        user.polls.push(poll.id)
        await poll.save()
        await user.save()
        token = createJsonWebToken(user.id, 'PARTICIPANT', false, poll.refId)

    }
    return {user, token, pseudonym: args.pseudonym}
}

interface ICreateParticipantInput {
    email: string,
    pollId: string,
    pseudonym: string
}
