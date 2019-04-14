import { IResolvers } from 'graphql-tools';
import { createPoll, updatePoll, deletePoll } from './cudPoll';
import { createOption, deleteOption, updateOption } from './cudOption';
import { createParticipant, updateParticipant } from './cudParticipant';
import { updateVotes } from './vote'
import { Poll } from '../../../models/Poll';
import { User } from '../../../models/User';
import { helmet } from '../helmet';
import { findPoll, getPseudonymOfUser } from '../../../utilities/dataBaseUtilities';
import { IVote } from '../../../../interfaces';


export const resolvers: IResolvers = {
    Query: {
        poll: (_, args) => {
            return findPoll(args.id)
        },
        polls: () => {
            return Poll.find({});
        },
        option: async (_, args) => {
            const poll = await findPoll(args.pollId)
            for (const option of poll.options) {
                if (option.refId === args.optionId) {
                    return option
                }
            }
        }
    },
    Mutation: {
        createPoll: helmet(createPoll),
        updatePoll: helmet(updatePoll),
        deletePoll: helmet(deletePoll),
        createOption: helmet(createOption),
        updateOption: helmet(updateOption),
        deleteOption: helmet(deleteOption),
        createParticipant: helmet(createParticipant),
        updateParticipant: helmet(updateParticipant),
        updateVotes: helmet(updateVotes)
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
        result: (parent) => {
            let total = 0
            let possibleVotes = 0
            parent.votes.forEach((vote: IVote) => {
                total += vote.rating
                possibleVotes += 10
            })
            return {
                totalOpposition: total,
                agreementInPercent: Math.round((1 - total / possibleVotes) * 100),
                totalVotes: possibleVotes / 10
            }
        },
        creator: (parent) => {
            return User.findById(parent.creator)
        },
        userRating: (parent, _, context) => {
            let userRating = null;
            if (context.user) {
                parent.votes.forEach((vote: IVote) => {
                    if (context.user.id.toString() === vote.voter.toString()) {
                        userRating = vote.rating
                    }
                })
            }
            return userRating
        },
    },
    Vote: {
        voter: (parent) => {
            const user = User.findById(parent.voter)
            const pseudonym = getPseudonymOfUser(parent.voter.toString(), parent.parent().parent())
            return {
                user,
                pseudonym
            }
        }
    }
};