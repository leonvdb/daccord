import gql from 'graphql-tag';

export const UPDATE_OPTION = gql`
mutation UpdateOption($pollId: ID!, $optionId: ID!, $title: String, $description: String){
    updateOption(pollId: $pollId, optionId: $optionId, title: $title, description: $description){
        title
        description
        refId
        creator{
            id
        }
    }
}
`