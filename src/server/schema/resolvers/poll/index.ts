import { IResolvers } from 'graphql-tools';
import { createPoll } from './createPoll';
import { Poll } from '../../../models/Poll';
import { User } from '../../../models/User';
import { helmet } from '../helmet';
import { createRefId } from '../../../utilities/cryptoGenerators';
import { findOption, findPoll } from '../../../utilities/dataBaseUtilities'
import { ApiError } from '../../../utilities/ApiError';

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
        }),
        createOption: helmet(async (_, { pollId, title, description, userId }) => {
            const poll = await Poll.findOne({ refId: pollId });
            if (!poll) return new ApiError("Poll not found", 404)
            const newOpt = {
                title,
                description,
                creator: userId,
                refId: createRefId(),
                votes: []
            }
            poll.options.unshift(newOpt);
            return await poll.save()

        }),
        deleteOption: helmet(async (_, { pollId, optionId }) => {
            const poll = await findPoll(pollId)
            const { index, error } = findOption(poll, optionId)
            if (error) return new ApiError(error, 404)
            poll.options.splice(index, 1);
            return await poll.save()
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