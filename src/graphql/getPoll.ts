import gql from 'graphql-tag';

export const getPoll = gql`
query Poll($id: ID!){
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
        creator{
            id
        }
    }
  }
}
`;