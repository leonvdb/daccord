import gql from 'graphql-tag';

export const GET_VOTES_FROM_OPTION = gql`
query($pollId: ID!, $optionId: ID!){
    option(pollId: $pollId, optionId: $optionId){
        votes{
            id
            voter{
            user{
                id
            }
            pseudonym
            }
            rating
        }
    }
}
`