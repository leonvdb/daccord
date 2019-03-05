/* 
KEEP FOR REFERENCE UNTIL VOTE IS IMPLEMENTED

*/


import express from 'express';
const router = express.Router();
import { ApiError } from '../../utilities/ApiError';
import asnycHandler from 'express-async-handler';
import { IVoteForPollPayload} from 'src/interfaces';

import { findOrCreateUser, findPoll} from '../../utilities/dataBaseUtilities';



//@route    PUT api/polls/:poll_id/vote
//@desc     Vote on options
//@access   Private // TODO: Make route private
//@params   UserEmail(could also be ID), {option.RefID: Vote,}
router.put('/:poll_id/vote', asnycHandler(async (req, res, next) => {

    const vote: IVoteForPollPayload = req.body;

    const userPromise = findOrCreateUser(vote.voterEmail)
    const pollPromise = findPoll(req.params.poll_id)


    const pollAndUser = await Promise.all([pollPromise, userPromise])
    const poll = pollAndUser[0]
    const user = pollAndUser[1]
    for (let i = 0; i < poll.options.length; i++) {

        //Check if Option has been voted on in this request
        if (!(req.body.votes.hasOwnProperty(poll.options[i].refId))) {
            continue;
        }

        //Check if Payload is valid
        if (vote.rating < 0 || vote.rating > 10) {
            return next(new ApiError('Vote value has to be between 0 and 10', 404));
        }

        //Check if this Option has already been voted on by this User and remove old vote if so
        const removePreviousVotes = poll.options[i].votes.filter(vote => {

            if (vote.voter.toString() === user._id.toString()) {
                return false
            }
            return true
        })
        // TODO check if this line is useless 
        poll.options[i].votes = removePreviousVotes;

        //Construct vote for option
        const newVote = {
            voter: user._id.toHexString(),
            rating: vote.rating
        }
        //Add vote to option
        poll.options[i].votes.unshift(newVote)

    }
    //Save and send response
    const response = await poll.save()
    // TODO fix this api response with new ApiResponsex
    res.json(response);
}))

export default router;