export const typeDef = `
type CreatePollResponse{
    poll: Poll!
    token: String!
    user: User!
}

type PollQueryResponse{
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
      options: [Option!]
}

type Option{
      title: String! 
      refId: ID!
      creator: User!
      description: String
      votes: [Vote!]
}

type Vote{
      voter: User!
      rating: Int!
}

input VoteInput{
      optionId: String!
      rating: Int
}

type Participant{
      user: User!
      token: String!
}

type CreateParticipantResponse{
      user: User!
      token: String
}

`