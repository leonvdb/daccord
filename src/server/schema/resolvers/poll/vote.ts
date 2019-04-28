import { IContext, IVoteNew, IOption } from '../../../../interfaces';
import { findPoll } from '../../../utilities/dataBaseUtilities';

interface IUpdateVotesInput {
    pollId: string
    votes: IVoteNew[]
}

export const updateVotes = async (_: any, args: IUpdateVotesInput, context: IContext) => {
    const poll = await findPoll(args.pollId);
    const modifiedOptions: any = []
    poll.options.forEach((option: IOption, optionIndex: number) => {
        args.votes.forEach(inputVote => {
            if (option.refId === inputVote.optionId) {
                if (option.votes.length > 0) {
                    let updated = false
                    for (const [voteIndex, vote] of option.votes.entries()) {
                        if (vote.voter.toString() === context.user.id) {
                            if (inputVote.rating !== null) {
                                poll.options[optionIndex].votes[voteIndex].rating = inputVote.rating
                            } else {
                                poll.options[optionIndex].votes.splice(voteIndex, 1)
                            }
                            updated = true
                            break;
                        }
                    }
                    if (!updated) {
                        if (inputVote.rating !== null) poll.options[optionIndex].votes.push({ voter: context.user.id, rating: inputVote.rating })
                    }
                } else {

                    if (inputVote.rating !== null) {
                        poll.options[optionIndex].votes.push({ voter: context.user.id, rating: inputVote.rating })
                    }
                }
                modifiedOptions.push(option)
            }
        })
    })
    await poll.save()
    return modifiedOptions
}