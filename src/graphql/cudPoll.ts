import gql from 'graphql-tag';

export const CREATE_POLL = gql`

mutation CreatePoll($title: String!, $userEmail: String!, $userName: String!){
    createPoll(title: $title, userEmail: $userEmail, userName: $userName){
        user{
            id
            email
        }
        poll{
            refId
        }
        token
    }
}
`
export const DELETE_POLL = gql`
mutation DeletePoll($pollId: ID!){
    deletePoll(pollId: $pollId)
}
`;