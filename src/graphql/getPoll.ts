import gql from 'graphql-tag';

export const getPoll = gql`
query($id: ID!){
    poll(id: $id){
        title
        refId
        description
        creator{
            id
        }
        participants{
            user{
                id
            }
        }
        options{
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
}
`
    ;

export const getPollAndAuthParticipant = gql`
query($id: ID!, $authToken: String!){
    poll(id: $id){
        title
        refId
        description
        creator{
            id
        }
        participants{
            user{
                id
            }
        }
        options{
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
    authUser(authToken: $authToken, id: $id){
        isParticipant
        token
        user{
            id
            email
        }
        pseudonym
    }
}
`