import * as express from 'express';
const router = express.Router();
import createRefId from '../../utilities/createRefId';

//Load Models
import { Poll, IPollModel } from '../../models/Poll';
import { User, IUserModel } from '../../models/User';
import { ApiError } from 'src/server/utilities/ApiError';
import * as asnycHandler from 'express-async-handler'



//declare interfaces 

interface PollFields {
    title?: string
}

//@route    POST api/polls
//@desc     Creates new poll. If Email-address unknown creates new User in database.
//@access   Public
router.post('/', (req, res) => {

    // Check if email corresponds to User in DB
    User.findOne({ email: req.body.email }).then((user: IUserModel) => {
        if (user) {
            // Create new poll with user.id
            createNewPoll(user);
        } else {
            //No corresponding user - Create new User
            const newUser = new User({
                email: req.body.email
            });

            //Save new User and create new poll with user.id
            newUser
                .save()
                .then((user: IUserModel) => createNewPoll(user))
        }
    })

    async function createNewPoll(user: IUserModel): Promise<void> {

        const refId = createRefId();

        const newPoll = new Poll({
            title: req.body.title,
            creator: user.id,
            refId
        });

        //Save new poll
        try {
            const poll = await newPoll.save()
            user.polls.push(poll._id)
            await user.save()
            res.json(poll)
        } catch (error) {
            res.json(error)
        }
    }
});

//@route    GET api/polls/:poll_id
//@desc     GET poll by id
//@access   Private // TODO: Make route private
router.get('/:poll_id', (req, res) => {
    Poll.findOne({ refId: req.params.poll_id })
        .then((poll: IPollModel) => {
            if (!poll) return res.status(404).json({ 'msg': 'There is no poll for this ID' });
            return res.json(poll)
        })
        .catch((err: Error) => res.json(err));
});

//@route    PUT api/polls/:poll_id
//@desc     Edit poll
//@access   Private // TODO: Make route private
router.put('/:poll_id', (req, res) => {

    // Collect request body data
    const pollFields: PollFields = {};
    if (req.body.title) pollFields.title = req.body.title;

    //Update poll
    Poll.findOneAndUpdate(
        { refId: req.params.poll_id },
        pollFields,
        { new: true }
    )
        .then((poll: IPollModel) => {
            if (!poll) return res.status(404).json({ 'msg': 'There is no poll for this ID' });
            return res.json(poll)
        })
        .catch((err: Error) => {
            console.log("fail")
            return res.json(err)
        });
});

//@route    DELETE api/polls/:poll_id
//@desc     Delete poll
//@access   Private // TODO: Make route private
router.delete('/:poll_id', (req, res) => {
    Poll.findOneAndRemove({ refId: req.params.poll_id })
        .then((poll: IPollModel) => {
            if (!poll) return res.status(404).json({ 'msg': 'There is no poll for this ID' });
            return res.json({ success: true });
        })
        .catch((err: Error) => res.json(err));
});


//@route    PUT api/polls/:poll_id/vote
//@desc     Vote on options
//@access   Private // TODO: Make route private
//@params   UserEmail(could also be ID), {option.RefID: Vote,}
router.put('/:poll_id/vote', asnycHandler(async (req, res, next) => {

    const userPromise = findUser(req.body.email)
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
        const votePayload = Number(req.body.votes[poll.options[i].refId]);
        if (votePayload < 0 || votePayload > 10) {
            return next(new ApiError('Vote value has to be between 0 and 10', 404));
        }

        //Check if this Option has already been voted on by this User and remove old vote if so
        poll.options[i].votes.filter(vote => {
            if (vote.voter.toString() === user._id.toString()) {
                return false
            }
            return true
        })



        //Construct vote for option
        const newVote = {
            voter: user._id,
            vote: votePayload
        }

        //Add vote to option
        poll.options[i].votes.unshift(newVote)

    }
    //Save
    await poll.save()
}))



function findPoll(pollId: string) {
    return Poll.findOne({ refId: pollId })
        .then(validatePoll)
}
function findUser(email: string) {
    return User.findOne({ email })
        .then((user: IUserModel) => {
            if (!user) {
                // Create new poll with user.id
                return createUser(email)
            }
            return user
        })
}

function validatePoll(poll: IPollModel, ): IPollModel {
    //Check if poll exists
    if (!poll) {
        // This should work because it is handled by the asnycHandler middleware
        const message = 'There is no poll for this ID'
        Promise.reject(message)
    }
    //Check if user exists
    return poll
}

function createUser(email: string): Promise<IUserModel> {
    //No corresponding user - Create new User
    const newUser = new User({
        email
    });

    //Save new User and create new poll with user.id
    return newUser.save()
        .then((user: IUserModel) => user)

}


export default router;