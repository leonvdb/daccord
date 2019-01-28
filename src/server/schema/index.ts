import { ApolloServer, gql } from 'apollo-server-express';
import { resolvers as pollResolvers, typeDef as Poll } from './poll';
import { resolvers as userResolvers, typeDef as User } from './user';
import { merge } from 'lodash';


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
const server = new ApolloServer({
    typeDefs: gql(Query + Mutation + Poll + User),
    resolvers: merge(pollResolvers, userResolvers)
})

export default server;