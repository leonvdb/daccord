import { IResolvers } from 'graphql-tools';
import { helmet } from '../helmet';
import { sendAuthLink } from './sendAuthLink';
import { findPoll, getUser, getPseudonymOfUser } from '../../../utilities/dataBaseUtilities';
import { createJsonWebToken } from '../../../utilities/createJsonWebToken';


export const resolvers: IResolvers = {
    Query: {
        authUser: async (_, args, context) => {
            const poll = await findPoll(args.id)
            let token = ''
            let pseudonym = ''
            let user = {
                id: '',
                email: '',
            }
            let isParticipant = false
            if (args.authToken) {
                if (poll.creatorToken === args.authToken) {
                    token = createJsonWebToken(poll.creator, 'CREATOR', false, args.id)
                    user = await getUser(poll.creator)
                    pseudonym = poll.creatorPseudonym
                    isParticipant = true
                } else {
                    for (const participant of poll.participants) {
                        if (participant.token === args.authToken) {
                            token = createJsonWebToken(participant.id, 'PARTICIPANT', false, args.id)
                            user = await getUser(participant.id)
                            pseudonym = participant.pseudonym
                            isParticipant = true
                        }
                    }
                }
            } else if (context.user) {
                user = await getUser(context.user.id)
                const relatedPseudonym = getPseudonymOfUser(user.id, poll)
                if (relatedPseudonym) {
                    pseudonym = relatedPseudonym
                    isParticipant = true
                }
            }
            return { isParticipant, token, user, pseudonym }
        }

    },
    Mutation: {
        sendAuthLink: helmet(sendAuthLink)
    }
}


