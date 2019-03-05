import gql from 'graphql-tag';

export const CREATE_PARTICIPANT = gql`
mutation CreateParticipant($pollId: ID!, $email: String!){
    createParticipant(pollId: $pollId, email: $email){
        user{
            id
            email
        }
        token
    }
}
`