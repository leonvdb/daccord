import gql from 'graphql-tag';

export const SEND_AUTH_LINK = gql`
mutation SendAuthLink($pollId: ID!, $email: String!){
    sendAuthLink(pollId: $pollId, email: $email)
}
`