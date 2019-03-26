export const typeDef = `
type CreatePollResponse{
    poll: Poll!
    token: String!
    user: User!
    pseudonym: String!
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
      creatorPseudonym: String!
      participants: [Participant!]
      options: [Option!]
}

type Option{
      title: String! 
      refId: ID!
      creator: User!
      description: String
      votes: [Vote!]
      userRating: Int
      result: Result
}

type Vote{
      id: ID!
      voter: Voter!
      rating: Int!
}

type Voter{
      user: User!
      pseudonym: String!
}

type Result{
      totalOpposition: Int
      agreementInPercent: Int
      totalVotes: Int
}

input VoteInput{
      optionId: String!
      rating: Int
}

type Participant{
      user: User!
      pseudonym: String!
      token: String!
}

type CreateParticipantResponse{
      user: User!
      token: String
      pseudonym: String!
}

`