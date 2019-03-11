import gql from 'graphql-tag';

export const getPoll = gql`
query($id: ID!){
    poll(id: $id){
        title
        refId
        creator{
            id
        }
        options{
            title
            description
            refId
            userRating
            creator{
                id
            }
        }
    }
}
`
;

export const getPollAndAuthParticipant = gql`
query($id: ID!, $authToken: String!){
    poll(id: $id){
        title
        refId
        creator{
            id
        }
        options{
            title
            description
            refId
            userRating
            creator{
                id
            }
        }
    }
    authUser(authToken: $authToken, id: $id){
        token
        user{
            id
            email
        }
    }
}
`