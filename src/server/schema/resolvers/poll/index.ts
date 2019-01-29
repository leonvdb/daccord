import { IResolvers } from 'graphql-tools';
import { createPoll } from './createPoll';
import { Poll } from '../../../models/Poll';
import { User } from '../../../models/User';
import { helmet } from '../helmet';

export const resolvers: IResolvers = {
    Query: {
        poll: (_, args) => {
            return Poll.findOne({ refId: args.id })
        },
        polls: () => {
            return Poll.find({});
        }
    },
    Mutation: {
        createPoll: helmet(createPoll),
        updatePoll: helmet(async (_, { pollId, title }) => {
            const pollFields = {
                title
            }
            const poll = await Poll.findOneAndUpdate(
                { refId: pollId },
                pollFields,
                { new: true }
            )
            return poll;
        }),
        deletePoll: helmet(async (_, { pollId }) => {
            const poll = await Poll.findOneAndDelete({ refId: pollId })
            return poll ? true : false
        })
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
    }
};