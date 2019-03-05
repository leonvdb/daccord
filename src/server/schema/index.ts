import { ApolloServer } from 'apollo-server-express';
import typeDefs from './typeDefs'
import resolvers from './resolvers'

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }: any) => {
        const user = req.user
        return ({ user })
    }
})

export default server;