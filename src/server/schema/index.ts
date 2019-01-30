import { ApolloServer } from 'apollo-server-express';
import typeDefs from './typeDefs'
import resolvers from './resolvers'

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }: any) => {
        console.log({ request: req.headers })
    }
})

export default server;