import { GraphQLSchema, GraphQLObjectType, GraphQLID, GraphQLString, GraphQLList, GraphQLBoolean } from 'graphql';
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
        user: {
            type: UserType,
            resolve: async (parent, args) => {
                return await User.findById(parent.id)
            }
        },
        token: { type: GraphQLString }
    })
})

const UserType: GraphQLObjectType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        id: { type: GraphQLID },
        email: { type: GraphQLString },
        password: { type: GraphQLString },
        registered: { type: GraphQLBoolean },
        polls: {
            type: GraphQLList(PollType),
            resolve(parent, args) {
                return parent.polls.map(async (pollId: string) => {
                    return await Poll.findById(pollId)
                })
            }
        }
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
        },
        user: {
            type: UserType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return User.findById(args.id)
            }
        },
        users: {
            type: GraphQLList(UserType),
            resolve() {
                return User.find({})
            }
        }
    }
})

export default new GraphQLSchema({
    query: RootQuery
})