import { IResolvers } from 'graphql-tools';
import { helmet } from '../helmet';
import { sendAuthLink } from './sendAuthLink';
import { findPoll, getUser } from '../../../utilities/dataBaseUtilities';
import { createJsonWebToken } from '../../../utilities/createJsonWebToken';


export const resolvers: IResolvers = {
    Query: {
        authUser: async (_, args) => {
            const poll = await findPoll(args.id)
            let token = ''
            let pseudonym = ''
            let user = {
                id: '',
                email: '',
            }
            if (args.authToken) {
                if (poll.creatorToken === args.authToken) {
                    token = createJsonWebToken(poll.creator, 'CREATOR', false, args.id)
                    user = await getUser(poll.creator)
                    pseudonym = poll.creatorPseudonym
                } else {
                    for (const participant of poll.participants){
                        if (participant.token === args.authToken) {
                            token = createJsonWebToken(participant.id, 'PARTICIPANT', false, args.id)
                            user = await getUser(participant.id)
                            pseudonym = participant.pseudonym
                        }
                    }
                }
            }   
            return {token, user, pseudonym }
        }

    },
    Mutation: {
        sendAuthLink: helmet(sendAuthLink)
    }
}


