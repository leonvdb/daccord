import { IResolvers } from 'graphql-tools';
import { Poll } from '../models/Poll';

export const typeDef = `
type User{
      id: ID!
      email: String!
      password: String
      registered: Boolean!
      polls: [Poll!]
}
`

export const resolvers: IResolvers = {
    User: {
        polls: (parent) => {
            return parent.polls.map((pollId: string) => {
                return Poll.findById(pollId)
            })
        }
    }
};