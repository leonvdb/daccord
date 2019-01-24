import { IResolvers } from 'graphql-tools';
import { Poll } from './models/Poll';
import { User } from './models/User';

const resolvers: IResolvers = {
    Query: {
        poll: (_, args) => {
            return Poll.findOne({ refId: args.id })
        },
        polls: () => {
            return Poll.find({});
        }
    },
    Poll: {
        creator: (parent) => {
            return User.findById(parent.creator)
        }
    },
    User: {
        polls: (parent) => {
            return parent.polls.map((pollId: string) => {
                return Poll.findById(pollId)
            })
        }

    },
    Participant: {
        user: (parent) => {
            return User.findById(parent.id)
        }
    }
};

export default resolvers; 