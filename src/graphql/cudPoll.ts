import gql from 'graphql-tag';

export const CREATE_POLL = gql`

mutation CreatePoll($title: String!, $userEmail: String!, $userName: String!, $description: String){
    createPoll(title: $title, userEmail: $userEmail, userName: $userName, description: $description){
        user{
            id
            email
        }
        poll{
            refId
        }
        token
        pseudonym
    }
}
`
export const DELETE_POLL = gql`
mutation DeletePoll($pollId: ID!){
    deletePoll(pollId: $pollId)
}
`;

export const UPDATE_POLL = gql`
mutation UpdatePoll($pollId: ID!, $title: String){
    updatePoll(pollId: $pollId, title: $title){
        title
    }
}
`