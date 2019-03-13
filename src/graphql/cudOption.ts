import gql from 'graphql-tag';

export const createOption = gql`
mutation CreateOption(
        $pollId: ID!,
        $userId: ID!,
        $title: String!,
        $description: String
    ) {
        createOption(
            pollId: $pollId,
            userId: $userId,
            title: $title,
            description: $description
        ){
            title
            description
            refId
            userRating
            result{
                totalOpposition
                agreementInPercent
            }
            creator{
                id
            }
        }
    }

`
export const UPDATE_OPTION = gql`
mutation UpdateOption($pollId: ID!, $optionId: ID!, $title: String, $description: String){
    updateOption(pollId: $pollId, optionId: $optionId, title: $title, description: $description){
        title
        description
        refId
        userRating
        creator{
            id
        }
    }
}
`
export const DELETE_OPTION = gql`
mutation DeleteOption($pollId: ID!, $optionId: ID!){
    deleteOption(pollId: $pollId, optionId: $optionId)
}
`