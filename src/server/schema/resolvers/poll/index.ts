import { IResolvers } from 'graphql-tools';
import { createPoll, updatePoll, deletePoll } from './cudPoll';
import { createOption, deleteOption, updateOption } from './cudOption';
import { Poll } from '../../../models/Poll';
import { User } from '../../../models/User';
import { helmet } from '../helmet';
import { findPoll } from '../../../utilities/dataBaseUtilities';
import { createJsonWebToken } from '../../../utilities/createJsonWebToken';
import { ObjectID } from 'bson';


export const resolvers: IResolvers = {
    Query: {
        poll: async (_, args) => {
            const poll = await findPoll(args.id)
            let token = ''
            let user = {
                id: '',
                email: ''
            }
            if (args.authToken) {
                if (poll.creatorToken === args.authToken) {
                    token = createJsonWebToken(poll.creator, 'CREATOR', false, args.id)
                    user = await getUser(poll.creator)
                } else {
                    poll.participants.forEach(async (participant) => {
                        if (participant.token === args.authToken) {
                            token = createJsonWebToken(participant.id, 'PARTICIPANT', false, args.id)
                            user = await getUser(participant.id)
                        }
                    })
                }
            }
            return { poll, token, user }
        },
        polls: () => {
            return Poll.find({});
        }
    },
    Mutation: {
        createPoll: helmet(createPoll),
        updatePoll: helmet(updatePoll),
        deletePoll: helmet(deletePoll),
        createOption: helmet(createOption),
        updateOption: helmet(updateOption),
        deleteOption: helmet(deleteOption)
    },
    Poll: {
        creator: (parent) => {
            return User.findById(parent.creator)
        }
    },
    Participant: {
        user: (parent) => {
            return User.findById(parent.id)
        }
    },
    Option: {
        creator: (parent) => {
            return User.findById(parent.creator)
        }
    },
    Vote: {
        voter: (parent) => {
            return User.findById(parent.creator)
        }
    }
};

async function getUser(userId: ObjectID){
    const user = {
        id: '',
        email: ''
    }
    const userFromDB = await User.findById(userId)
    if (userFromDB) {
        user.email = userFromDB.email
        user.id = userFromDB.id
    }
    return user
}