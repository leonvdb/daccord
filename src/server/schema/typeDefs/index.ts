import { gql } from 'apollo-server-express'
import { typeDef as Poll } from './poll';
import { typeDef as User } from './user';

const Query = `
type Query {
    polls: [Poll!]
    poll(id: ID!): Poll
}
`
const Mutation = `
type Mutation{
    createPoll(userEmail: String!, title: String!): CreatePollResponse!
    updatePoll(pollId: ID!, title: String): Poll!
    deletePoll(pollId: ID!): Boolean!
}
`
const typeDefs = gql(Query + Mutation + Poll + User)

export default typeDefs; 