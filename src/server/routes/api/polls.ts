import * as express from 'express';
const router = express.Router();
import createRefId from '../../utilities/createRefId';
import { ApiError } from '../../utilities/ApiError';
import * as asnycHandler from 'express-async-handler';
import { transporter } from '../../config/nodemailer';
import { mailUser, secretOrKey } from '../../config/secrets';
import * as jwt from 'jsonwebtoken';
import * as passport from 'passport';

//Load Models
import { Poll, IPollDocument } from '../../models/Poll';
import { User, IUserDocument } from '../../models/User';
import { IJwtPayload } from 'src/interfaces';


//@route    POST api/polls
//@desc     Creates new poll. If Email-address unknown creates new User in database.
//@access   Public
router.post('/', (req, res) => {

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
            sendConfirmMail(user.email, poll)
            res.json(poll)
        } catch (error) {
            res.json(error)
        }
    }
});

function generateToken(): string {
    const token = createRefId() + createRefId() + createRefId()
    return token
}

function sendConfirmMail(userEmail: string, poll: IPollDocument): void {

    const mailOptions = {
        from: mailUser, // sender address
        to: userEmail, // list of receivers
        subject: `Your new Poll "${poll.title}" has been created!`, // Subject line
        html: `<p>Click <a href="http://localhost:3000/poll/${poll.refId}/token/${poll.creatorToken}">here</a> to get to your poll </p>` // plain text body
    };

    //TODO: Change console logs to log to logfile
    transporter.sendMail(mailOptions, (err, info) => {
        if (err)
            console.log(err)
        else
            console.log(info);
    });


}

//@route    GET api/polls/:poll_id
//@desc     GET poll by id
//@access   Private or Public // TODO: Decide wether it should be private or public
router.get('/:poll_id', (req, res) => {
    Poll.findOne({ refId: req.params.poll_id })
        .then((poll: IPollDocument) => {
            if (!poll) return res.status(404).json({ 'msg': 'There is no poll for this ID' });
            //TODO: Adjust so that Creator Token is not exposed in response object.
            return res.json(poll)
        })
        .catch((err: Error) => res.json(err));
});

//@route    GET api/polls/:poll_id/token/:token
//@desc     GET poll by id and authenticate user by token
//@access   Public
router.get('/:poll_id/token/:token', (req, res, next) => {
    Poll.findOne({ refId: req.params.poll_id })
        .then((poll: IPollDocument) => {
            if (!poll) return next(new ApiError('There is no poll for this ID', 404))

            if (req.params.token !== poll.creatorToken) {
                return next(new ApiError('Incorrect Token', 401));
            }

            const payload: IJwtPayload = {
                userId: poll.creator,
                accountLogin: false,
                pollId: req.params.poll_id
            }

            //Sign JWT
            jwt.sign(payload, secretOrKey, { expiresIn: "1d" }, (err, token) => {
                //TODO: Adjust so that Creator Token is not exposed in response object.
                return res.json({
                    poll,
                    token: "Bearer " + token
                })
            })
        })
        .catch((err: Error) => res.json(err));
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
    if (jwtPayload.pollId !== req.params.poll_id) {
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
        .then((poll: IPollDocument) => {
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
        const removePreviousVotes = poll.options[i].votes.filter(vote => {

            if (vote.voter.toString() === user._id.toString()) {
                return false
            }
            return true
        })
        poll.options[i].votes = removePreviousVotes;

        //Construct vote for option
        const newVote = {
            voter: user._id,
            vote: votePayload
        }
        //Add vote to option
        poll.options[i].votes.unshift(newVote)

    }
    //Save and send response
    const response = await poll.save()
    res.json(response);
}))



function findPoll(pollId: string) {
    return Poll.findOne({ refId: pollId })
        .then(validatePoll)
}
function findUser(email: string) {
    return User.findOne({ email })
        .then((user: IUserDocument) => {
            if (!user) {
                // Create new poll with user.id
                return createUser(email)
            }
            return user
        })
}

function validatePoll(poll: IPollDocument, ): IPollDocument {
    //Check if poll exists
    if (!poll) {
        // This should work because it is handled by the asnycHandler middleware
        const message = 'There is no poll for this ID'
        Promise.reject(message)
    }
    //Check if user exists
    return poll
}

function createUser(email: string): Promise<IUserDocument> {
    //No corresponding user - Create new User
    const newUser = new User({
        email
    });

    //Save new User and create new poll with user.id
    return newUser.save()
        .then((user: IUserDocument) => user)

}


export default router;