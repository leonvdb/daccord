import { gql } from 'apollo-server-express'
import { typeDef as Poll } from './poll';
import { typeDef as User } from './user';

const Query = `
type Query {
    polls: [Poll!]
    poll(id: ID!, authToken: String): Poll!
    authUser(authToken: String!, id: ID!): AuthUser!
    user(id: ID!): User!
}
`

const Mutation = `
type Mutation{
    createPoll(userEmail: String!, userName: String!, title: String!): CreatePollResponse!
    updatePoll(pollId: ID!, title: String): Poll!
    deletePoll(pollId: ID!): Boolean!
    createOption(pollId: ID!, userId: ID!, title: String!, description: String): Option!
    updateOption(pollId: ID! optionId: ID!, title: String, description: String): Option!
    deleteOption(pollId: ID!, optionId: ID!): Boolean!
    createParticipant(pollId: ID!, email: String!): CreateParticipantResponse!
    sendAuthLink(pollId: ID!, email: String!): Boolean!
    updateVotes(pollId: ID!, votes: [VoteInput!]): Boolean!
}
`
const typeDefs = gql(Query + Mutation + Poll + User)

export default typeDefs; 