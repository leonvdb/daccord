import * as express from 'express';
const router = express.Router();
import { createRefId, generateToken } from '../../utilities/cryptoGenerators';
import { ApiError } from '../../utilities/ApiError';
import * as asnycHandler from 'express-async-handler';
import * as passport from 'passport';
import { IJwtPayload, IVoteForPollPayload, IPoll } from 'src/interfaces';

//Load Models
import { Poll, IPollDocument } from '../../models/Poll';
import { User, IUserDocument } from '../../models/User';
import { sendConfirmMail } from '../../utilities/sendConfirmMail';
import { createJsonWebToken } from '../../utilities/createJsonWebToken';
import { findOrCreateUser, findPoll, findUserById } from '../../utilities/dataBaseUtilities';
import { ApiResponse } from '../../utilities/ApiResponse';
import { IGetPolls } from './responseInterfaces';

//@route    POST api/polls
//@desc     Creates new poll. If Email-address unknown creates new User in database.
//@access   Public
router.post('/', (req, res, next) => {

    // Check if email corresponds to User in DB
    User.findOne({ email: req.body.email }).then((user: IUserDocument) => {
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
                .then((user: IUserDocument) => createNewPoll(user))
        }
    })

    async function createNewPoll(user: IUserDocument): Promise<void> {

        const refId = createRefId();
        const creatorToken = generateToken();

        const newPoll = new Poll({
            title: req.body.title,
            creator: user.id,
            creatorToken,
            refId
        });


        try {
            //Save new poll
            const poll = await newPoll.save()
            //Add poll ref to user
            user.polls.push(poll._id)
            await user.save()

            //Send email with token to creator
            sendConfirmMail(user.email, poll, 'createNewPoll', poll.creatorToken)

            const token = createJsonWebToken(poll.creator, 'CREATOR', false, poll.refId)
            const pollRes = poll.getPollForFrontend()
            console.log('pollRes', pollRes);
            res.json(new ApiResponse<IGetPolls>({
                poll: pollRes,
                token,
                user: user.getUserForFrontend()
            }))

        } catch (error) {
            next(new ApiError(error))
        }
    }
});

//@route    GET api/polls/:poll_id
//@desc     GET poll by id
//@access   Private or Public // TODO: Decide wether it should be private or public
router.get('/:poll_id', async (req, res, next) => {
    const poll = await findPoll(req.params.poll_id)
    let token = '';
    if (req.query.token) {

        const user = await findUserById(poll.creator.toHexString())

        if (req.query.token === poll.creatorToken) {
            token = createJsonWebToken(poll.creator, 'CREATOR', false, req.params.poll_id)
            const pollRes = poll.getPollForFrontend()
            console.log('pollRes', pollRes);

            return res.json(new ApiResponse<IGetPolls>({
                poll: pollRes,
                token,
                user: user.getUserForFrontend()
            }))
        }

        for (let i = 0; i < poll.participants.length; i++) {
            if (poll.participants[i].participantToken === req.query.token) {
                const token = createJsonWebToken(poll.participants[0].participantId, 'PARTICIPANT', false, req.params.poll_id)
                const pollRes = poll.getPollForFrontend()
                console.log('pollRes', pollRes);
                return res.json(new ApiResponse<IGetPolls>({
                    poll: pollRes,
                    token,
                    user: user.getUserForFrontend()
                }))
            }
        }
        return next(new ApiError('INCORRECT_TOKEN', 401));
    }
    const pollRes = poll.getPollForFrontend()
    console.log('pollRes', pollRes);
    return res.json(new ApiResponse<IGetPolls>({
        poll: pollRes,
        token: '',
        user: { email: '', id: '' }
    }))
});

//@route    PUT api/polls/:poll_id
//@desc     Edit poll
//@access   Private // TODO: Make route private

//Declare Interfaces 
interface PollEditFields {
    title?: string
}

router.put('/:poll_id', passport.authenticate('jwt', { session: false }), (req, res, next) => {

    //TODO: Check that user is authorized to edit poll (i.e.: if user from jwt is creator)
    const jwtPayload: IJwtPayload = req.user
    if (!jwtPayload.isForLoggedInAccount && (jwtPayload.forPollId !== req.params.poll_id)) {
        return next(new ApiError('Incorrect Token', 401));
    }
    // Collect request body data
    const pollFields: PollEditFields = {};
    if (req.body.title) pollFields.title = req.body.title;
    //Update poll
    Poll.findOneAndUpdate(
        { refId: req.params.poll_id },
        pollFields,
        { new: true }
    )
        .then((poll: IPollDocument) => {
            if (!poll) return next(new ApiError('NO_POLL_FOR_THIS_ID', 404))
            return res.json(new ApiResponse<IPoll>(poll.getPollForFrontend()))
        })
        .catch((err: Error) => {
            return next(new ApiError(err.message))
        });
});

//@route    DELETE api/polls/:poll_id
//@desc     Delete poll
//@access   Private // TODO: Make route private
router.delete('/:poll_id', passport.authenticate('jwt', { session: false }), async (req, res, next) => {
    const jwtPayload: IJwtPayload = req.user
    console.log("id:", req.params.poll_id)
    const poll = await findPoll(req.params.poll_id)

    if (jwtPayload.userId.toString() !== poll.creator.toString()) {
        return next(new ApiError('Incorrect Token', 401));
    }
    try {
        await poll.remove()
        return res.json(new ApiResponse());
    } catch (error) {
        return next(new ApiError(error))
    }
});


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