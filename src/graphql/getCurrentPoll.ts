import gql from 'graphql-tag';

const getCurrentPoll = gql`
    query {
        currentPoll @client{
            title
        }
    }
`

export default getCurrentPoll; 