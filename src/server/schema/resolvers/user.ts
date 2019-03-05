import { IResolvers } from 'graphql-tools';
import { Poll  } from '../../models/Poll';
import { User } from '../../models/User';

export const resolvers: IResolvers = {
    Query: {
        user: async(_, args) => {
            return await User.findById(args.id)
        }
    },
    User: {
        polls: (parent) => {
            return parent.polls.map((pollId: string) => {
                return Poll.findById(pollId)
            })
        }
    }
};
