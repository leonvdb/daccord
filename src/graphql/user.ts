import gql from 'graphql-tag';

export const GET_USER = gql`
query ($id: ID!){
    user(id: $id){
        email
        id
    }
}
`