import { GraphQLSchema, GraphQLObjectType, GraphQLID, GraphQLString } from 'graphql';
import { Poll } from '../models/Poll';

const PollType = new GraphQLObjectType({
    name: 'Poll',
    fields: () => ({
        id: { type: GraphQLID },
        title: { type: GraphQLString }
    })
})

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        poll: {
            type: PollType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                console.log(args.id)
                return Poll.findOne({ refId: args.id })
            }
        }
    }
})

export default new GraphQLSchema({
    query: RootQuery
})