import { GraphQLSchema, GraphQLObjectType, GraphQLID, GraphQLString, GraphQLList } from 'graphql';
import { Poll } from '../models/Poll';
import { User } from '../models/User';

const PollType = new GraphQLObjectType({
    name: 'Poll',
    fields: () => ({
        id: { type: GraphQLID },
        refId: { type: GraphQLID },
        title: { type: GraphQLString },
        creator: {
            type: UserType,
            resolve(parent, args) {
                return User.findById(parent.creator)
            }
        },
        creatorToken: { type: GraphQLString },
        participants: {
            type: new GraphQLList(ParticipantType)
        }

    })
})

const ParticipantType = new GraphQLObjectType({
    name: 'Participant',
    fields: () => ({
        participant: {
            type: UserType,
            resolve(parent, args) {
                return User.findById(parent.participant)
            }
        },
        participantToken: { type: GraphQLString }
    })
})

const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        id: { type: GraphQLID }
    })
})

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        poll: {
            type: PollType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return Poll.findOne({ refId: args.id })
            }
        },
        polls: {
            type: new GraphQLList(PollType),
            resolve() {
                return Poll.find({})
            }
        }
    }
})

export default new GraphQLSchema({
    query: RootQuery
})