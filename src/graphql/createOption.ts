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
        }
    }

`