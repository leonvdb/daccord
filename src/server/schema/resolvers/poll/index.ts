import { IResolvers } from 'graphql-tools';
import { createPoll, updatePoll, deletePoll } from './cudPoll';
import { createOption, deleteOption, updateOption } from './cudOption';
import { Poll } from '../../../models/Poll';
import { User } from '../../../models/User';
import { helmet } from '../helmet';
import { findPoll } from '../../../utilities/dataBaseUtilities';
import { createJsonWebToken } from '../../../utilities/createJsonWebToken';


export const resolvers: IResolvers = {
    Query: {
        poll: async (_, args) => {
            const poll = await findPoll(args.id)
            let token = ''
            if (args.authToken) {
                if (poll.creatorToken === args.authToken) {
                    token = createJsonWebToken(poll.creator, 'CREATOR', false, args.id)
                } else {
                    poll.participants.forEach((participant) => {
                        if (participant.token === args.authToken) {
                            token = createJsonWebToken(participant.id, 'PARTICIPANT', false, args.id)
                        }
                    })
                }
            }
            return { poll, token }
        },
        polls: () => {
            return Poll.find({});
        }
    },
    Mutation: {
        createPoll: helmet(createPoll),
        updatePoll: helmet(updatePoll),
        deletePoll: helmet(deletePoll),
        createOption: helmet(createOption),
        updateOption: helmet(updateOption),
        deleteOption: helmet(deleteOption)
    },
    Poll: {
        creator: (parent) => {
            return User.findById(parent.creator)
        }
    },
    Participant: {
        user: (parent) => {
            return User.findById(parent.id)
        }
    },
    Option: {
        creator: (parent) => {
            return User.findById(parent.creator)
        }
    },
    Vote: {
        voter: (parent) => {
            return User.findById(parent.creator)
        }
    }
};