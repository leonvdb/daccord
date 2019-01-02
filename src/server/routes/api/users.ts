import * as express from 'express';
import { findOrCreateUser, findPoll } from '../../utilities/dataBaseUtilities';
import { ApiError } from '../../utilities/ApiError';
import { generateToken } from '../../utilities/cryptoGenerators';
import { sendConfirmMail } from '../../utilities/sendConfirmMail';
import { createJsonWebToken } from '../../utilities/createJsonWebToken';
const router = express.Router({ mergeParams: true });

export default router;

//@route    POST api/polls
//@desc     Creates new poll. If Email-address unknown creates new User in database.
//@access   Public
router.post('/participate', async (req, res, next) => {

    let poll = await findPoll(req.body.pollId)
    let user = await findOrCreateUser(req.body.email)

    //Check if user participating
    let userParticipating = false
    if (poll.creator.toString() === user._id.toString()) {
        userParticipating = true
    };
    for (let i = 0; i < poll.participants.length; i++) {
        if (poll.participants[i].participantId.toString() === user._id.toString()) {
            userParticipating = true
        }
    }

    let newJWT = '';
    if (userParticipating) {

        //CASE: PollCreator not logged in, not asking for link
        //CASE: User not logged in, participating, not asking for link
        //----TODO-----// Put this validation into the front-end
        //Participant already exists - Authenticate or request new link.
        return next(new ApiError('PARTICIPANT_ALREADY_EXISTS', 401))
    } else {
        //CASE: User not logged in, not participating - give token
        //CASE: User logged in, not participating - give new token

        //Add user to participants
        const newParticipant = {
            participantId: user._id,
            participantToken: generateToken()
        }

        //Send email to new user
        sendConfirmMail(user.email, poll, 'becomeNewParticipant', newParticipant.participantToken)
        poll.participants.push(newParticipant)
        user.polls.push(poll._id)
        newJWT = createJsonWebToken(user._id, 'PARTICIPANT', false, poll.refId)

    }
    user = await user.save()
    poll = await poll.save()

    //If user is not in State and thus JWT was created,
    //include it in the json response object
    if (newJWT) {
        return res.json({
            option: poll.options[0],
            token: newJWT
        })
    }
    return res.json({ user, token: '' })

});

router.post('/accessLink', async (req, res, next) => {

    console.log(req.body)
    const poll = await findPoll(req.body.pollId);
    const user = await findOrCreateUser(req.body.email);
    let targetToken = -1;
    const newToken = generateToken();

    poll.participants.forEach(async (participant, index) => {
        if (participant.participantId.toString() === user._id.toString()) {
            targetToken = index
        }
    })

    if (poll.creator.toString() === user._id.toString()) {
        targetToken = -2
    }

    if (targetToken === -2) {
        poll.creatorToken = newToken
    } else if (targetToken >= 0) {
        poll.participants[targetToken].participantToken = newToken
    } else {
        return next(new ApiError('USER_NOT_FOUND', 404))
    }
    sendConfirmMail(user.email, poll, 'resendExistingParticipant', newToken);
    await poll.save()
    return res.json({ msg: 'access Link has been sent to email' })

})