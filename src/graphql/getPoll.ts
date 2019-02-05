import gql from 'graphql-tag';

export const getPoll = gql`
query Poll($id: ID!, $authToken: String){
    poll(id: $id, authToken: $authToken){
    title
    refId
    creator{
        id
    }
    options{
        title
        description
        refId
        creator{
            id
        }
    }
  }
}
`;