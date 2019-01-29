import { IResolvers } from 'graphql-tools';
import { Poll } from '../../models/Poll';

export const resolvers: IResolvers = {
    User: {
        polls: (parent) => {
            return parent.polls.map((pollId: string) => {
                return Poll.findById(pollId)
            })
        }
    }
};