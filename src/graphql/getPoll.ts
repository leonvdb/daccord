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
        creatorPseudonym
        participants{
            pseudonym
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
                participationInPercent
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
        creatorPseudonym
        participants{
            pseudonym
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
                participationInPercent
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

export const GET_INDIVIDUAL_VOTES = gql`
query($id: ID!){
    poll(id: $id){
        refId
        options{
            refId
            votes{
                voter{
                    user{
                        id
                    }
                    pseudonym
                }
                rating
            }
        }
    }
}
`