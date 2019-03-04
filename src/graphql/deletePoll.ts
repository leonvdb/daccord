import gql from 'graphql-tag';

export const DELETE_POLL = gql`
mutation DeletePoll($pollId: ID!){
    deletePoll(pollId: $pollId)
}
`;