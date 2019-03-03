import gql from 'graphql-tag';

export const CREATE_POLL = gql`

mutation CreatePoll($title: String!, $userEmail: String!){
    createPoll(title: $title, userEmail: $userEmail){
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