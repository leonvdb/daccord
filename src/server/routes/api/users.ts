import * as express from 'express';
import { findOrCreateUser, findPoll, findUserById } from '../../utilities/dataBaseUtilities';
import { ApiError } from '../../utilities/ApiError';
import { generateToken } from '../../utilities/cryptoGenerators';
import { sendConfirmMail } from '../../utilities/sendConfirmMail';
import { createJsonWebToken } from '../../utilities/createJsonWebToken';
import { ApiResponse } from '../../utilities/ApiResponse';
import { IPostUsersParticipate } from './responseInterfaces';
import { IUser } from 'src/interfaces';
const router = express.Router({ mergeParams: true });

export default router;

//@route    POST api/users/participate
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
        if (poll.participants[i].participant.toString() === user._id.toString()) {
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
            participant: user._id,
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
    // TODO why does this endpoint return different things
    if (newJWT) {
        return res.json(new ApiResponse({
            option: poll.options[0],
            token: newJWT,
            user: user.getUserForFrontend()
        }))
    }
    // TODO why is the user returned here? it should be user for Frontend
    return res.json(new ApiResponse<IPostUsersParticipate>({ user: user.getUserForFrontend(), token: '' }))

});

router.post('/accessLink', async (req, res, next) => {

    console.log(req.body)
    const poll = await findPoll(req.body.pollId);
    const user = await findOrCreateUser(req.body.email);
    let targetToken = -1;
    const newToken = generateToken();

    poll.participants.forEach(async (participant, index) => {
        if (participant.participant.toString() === user._id.toString()) {
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
    return res.json(new ApiResponse('access Link has been sent to email'))

})

//@route    GET api/users/:userId
//@desc     Creates new poll. If Email-address unknown creates new User in database.
//@access   Public
router.get('/:userId', async (req, res, next) => {
    try {
        const user = await findUserById(req.params.userId)
        return res.status(200).json(new ApiResponse<IUser>(user.getUserForFrontend()))
    } catch (error) {
        return next(new ApiError('USER_NOT_FOUND', 404))
    }
})