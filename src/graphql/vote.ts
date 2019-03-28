import gql from 'graphql-tag';

export const UPDATE_VOTES = gql`
mutation UpdateVotes($pollId: ID!, $votes: [VoteInput!]){
    updateVotes(pollId: $pollId, votes: $votes){
        title
        description
        refId
        userRating
        result{
            totalOpposition
            agreementInPercent
        }
        creator{
            id
        }
    }
}
`