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