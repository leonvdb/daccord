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

export const UPDATE_PARTICIPANT = gql`
mutation UpdateParticipant($pollId: ID!, $pseudonym: String!){
    updateParticipant(pollId: $pollId, pseudonym: $pseudonym)
}
`

export const DELETE_PARTICIPANT = gql`
mutation DeleteParticipant ($pollId: ID!){
    deleteParticipant(pollId: $pollId)
}`