import { gql } from 'apollo-server-express';

const typeDefs = gql`
type Query {
    polls: [Poll!]
    poll(id: ID!): Poll
}

type Mutation{
    createPoll(userEmail: String!, title: String!): CreatePollResponse!
}

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
  
type User{
      id: ID!
      email: String!
      password: String
      registered: Boolean!
      polls: [Poll!]
}

type Participant{
      user: User!
      token: String!
}
`;


export default typeDefs;