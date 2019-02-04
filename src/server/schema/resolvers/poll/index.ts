import { IResolvers } from 'graphql-tools';
import { createPoll, updatePoll, deletePoll } from './cudPoll';
import { createOption, deleteOption, updateOption } from './cudOption';
import { Poll } from '../../../models/Poll';
import { User } from '../../../models/User';
import { helmet } from '../helmet';
import { createError } from 'apollo-errors';


export const resolvers: IResolvers = {
    Query: {
        poll: async (_, args, context) => {
            const poll = await Poll.findOne({ refId: args.id })
            if (!poll) return createError("NotFoundError", {
                message: "Poll not found"
            })
            return poll
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