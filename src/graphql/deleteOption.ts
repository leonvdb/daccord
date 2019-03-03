import gql from 'graphql-tag'

export const DELETE_OPTION = gql`
mutation DeleteOption($pollId: ID!, $optionId: ID!){
    deleteOption(pollId: $pollId, optionId: $optionId)
}
`