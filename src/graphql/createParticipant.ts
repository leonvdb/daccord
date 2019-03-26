import gql from 'graphql-tag';

export const CREATE_PARTICIPANT = gql`
mutation CreateParticipant($pollId: ID!, $email: String!, $pseudonym: String!){
    createParticipant(pollId: $pollId, email: $email, pseudonym: $pseudonym){
        user{
            id
            email
        }
        token
        pseudonym
    }
}
`