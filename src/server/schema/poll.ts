import { IResolvers } from "graphql-tools";
import { Poll } from '../models/Poll';
import { findOrCreateUser } from '../utilities/dataBaseUtilities';
import { generateToken, createRefId } from '../utilities/cryptoGenerators';
import { sendConfirmMail } from '../utilities/sendConfirmMail';
import { createJsonWebToken } from '../utilities/createJsonWebToken';
import { ApiResponse } from '../utilities/ApiResponse';
import { ApiError } from '../utilities/ApiError';
import { User } from '../models/User';

export const typeDef = `
type CreatePollResponse{
    poll: Poll!
    token: String!
    user: User!
}

type Poll{
      id: ID!
      refId: ID!
      title: String!
      creator: User!
      creatorToken: String!
      participants: [Participant!]
}

type Participant{
      user: User!
      token: String!
}
`


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
        createPoll: async (_, { userEmail, title }) => {
            const user = await findOrCreateUser(userEmail)
            const newPoll = new Poll({
                title,
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

        },
        updatePoll: async (_, { pollId, title }) => {
            const pollFields = {
                title
            }
            const poll = await Poll.findOneAndUpdate(
                { refId: pollId },
                pollFields,
                { new: true }
            )
            return poll;
        }
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
