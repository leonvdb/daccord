import { findPoll, findOrCreateUser, getParticipantPosition } from '../../utilities/dataBaseUtilities';
import { generateToken } from '../../utilities/cryptoGenerators';
import { FatalError } from '../../utilities/errors/FatalError';
import { sendConfirmMail } from '../../utilities/sendConfirmMail';


export const sendAuthLink = async (_: any, args: any) => {
    const poll = await findPoll(args.pollId)
    const user = await findOrCreateUser(args.email)
    const participantIndex = getParticipantPosition(poll, user)
    const token = generateToken()

    if (participantIndex >= 0){
        poll.participants[participantIndex].token = token
    } else if(participantIndex === -2){
        poll.creatorToken = token
    } else {
        throw new FatalError({ data: { reason: "User not found" } })
    }
    poll.save()
    sendConfirmMail(args.email, poll, 'resendExistingParticipant', token);
    return true
}
