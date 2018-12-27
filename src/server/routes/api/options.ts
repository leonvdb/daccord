import * as express from 'express';
const router = express.Router({ mergeParams: true });
import * as passport from 'passport';
import { createRefId, generateToken } from '../../utilities/cryptoGenerators';
import { ApiError } from '../../utilities/ApiError';
import { findOrCreateUser, findPoll, findUserById } from "../../utilities/dataBaseUtilities";
import { createJsonWebToken } from "../../utilities/createJsonWebToken";
import { sendConfirmMail } from "../../utilities/sendConfirmMail";

//Load Models
import { IPollDocument } from '../../models/Poll';
import { IJwtPayload } from 'src/interfaces';


//@route    POST api/polls/:poll_id/options
//@desc     Create // TODO : Include Edit to this request
//@access   Private // TODO: Make route private
router.post('/', async (req, res, next) => {

    const poll = await findPoll(req.params.poll_id)

    //Check if user logged in and set creatorId
    let optionCreator;
    let loggedIn = false;
    if (req.body.userId) {
        //If user is in state userId will be supplied in Request Object
        loggedIn = true;
        optionCreator = await findUserById(req.body.userId)
    } else if (req.body.email) {
        //If user is not yet logged in User has to supply email
        optionCreator = await findOrCreateUser(req.body.email)
    } else return next(new ApiError('Supply userId or Email', 400))



    //Check if creatorParticipating
    let creatorParticipating = false
    let creatorPosition = -1
    if (poll.creator.toString() === optionCreator._id.toString()) {
        creatorParticipating = true
    };
    for (let i = 0; i < poll.participants.length; i++) {
        if (poll.participants[i].participantId.toString() === optionCreator._id.toString()) {
            creatorParticipating = true
            creatorPosition = i
        }
    }

    if (!loggedIn && creatorParticipating) {
        if (req.body.requestLink) {
            if (poll.creator.toString() === optionCreator._id.toString()) {
                //CASE: PollCreator not logged in, asking for link
                sendConfirmMail(
                    optionCreator.email,
                    poll,
                    'resendCreator',
                    poll.creatorToken
                )
            } else {
                //CASE: User not logged in, participating, asking for link
                sendConfirmMail(
                    optionCreator.email,
                    poll,
                    'resendExistingParticipant',
                    poll.participants[creatorPosition].participantToken
                )
            }
            return res.json({ "msg": "New Link has been sent." })

        } else {
            //CASE: PollCreator not logged in, not asking for link
            //CASE: User not logged in, participating, not asking for link
            //----TODO-----// Put this validation into the front-end
            //Participant already exists - Authenticate or request new link.
            return next(new ApiError('PARTICIPANT_ALREADY_EXISTS', 401))
        }
    }

    let newJWT = '';
    if (!creatorParticipating) {
        //CASE: User not logged in, not participating - give token
        //CASE: User logged in, not participating - give new token

        //Add user to participants
        const newParticipant = {
            participantId: optionCreator._id,
            participantToken: generateToken()
        }

        //Send email to new user
        sendConfirmMail(optionCreator.email, poll, 'becomeNewParticipant', newParticipant.participantToken)
        poll.participants.push(newParticipant)
        newJWT = createJsonWebToken(optionCreator._id, 'PARTICIPANT', false, poll.refId)

    }

    //Add option to poll
    const refId = createRefId();
    const newOpt = {
        title: req.body.title,
        creator: optionCreator._id,
        description: req.body.description,
        refId,
        votes: []
    };
    poll.options.unshift(newOpt);


    poll.save().then(poll => {

        //If user is not in State and thus JWT was created,
        //include it in the json response object
        if (newJWT) {
            return res.json({
                option: poll.options[0],
                token: newJWT
            })
        }
        return res.json({ option: poll.options[0], token: '' })
    })
        .catch(err => res.json(err));


});

//@route    GET api/polls/:poll_id/options
//@desc     GET all options of poll
//@access   Private // TODO: Make route private
router.get('/', async (req, res) => {

    const poll = await findPoll(req.params.poll_id)
    return res.json(poll.options)

});

//@route    GET api/polls/:poll_id/options/:opt_id
//@desc     GET option by Id
//@access   Private // TODO: Make route private
router.get('/:opt_id', async (req, res, next) => {

    const poll = await findPoll(req.params.poll_id)
    const { option, error } = findOption(poll, req.params.opt_id)
    if (error) next(new ApiError(error, 404))
    return res.json(option)

});

//@route    PUT api/polls/:poll_id/options/:opt_id
//@desc     Update option
//@access   Private // TODO: Make route private
router.put('/:opt_id', passport.authenticate('jwt', { session: false }), async (req, res, next) => {

    const poll = await findPoll(req.params.poll_id)
    const { option, index, error } = findOption(poll, req.params.opt_id)
    if (error) next(new ApiError(error, 404))

    const jwtPayload: IJwtPayload = req.user
    if (
        jwtPayload.pollId !== req.params.poll_id ||
        jwtPayload.userId.toString() !== option.creator.toString()
    ) {
        return next(new ApiError('Incorrect Token', 401));
    }


    //Update option
    if (req.body.title) poll.options[index].title = req.body.title;
    if (req.body.description) poll.options[index].description = req.body.description;

    //Save
    poll.save().then(poll => res.json(poll));

});

//@route    DELETE api/polls/:poll_id/options/:opt_id
//@desc     Delete option
//@access   Private // TODO: Make route private
router.delete('/:opt_id', passport.authenticate('jwt', { session: false }), async (req, res, next) => {

    const poll = await findPoll(req.params.poll_id)
    const { option, index, error } = findOption(poll, req.params.opt_id)
    if (error) next(new ApiError(error, 404))

    const jwtPayload: IJwtPayload = req.user
    if (
        jwtPayload.pollId !== req.params.poll_id ||
        jwtPayload.userId.toString() !== option.creator.toString()
    ) {
        return next(new ApiError('Incorrect Token', 401));
    }

    //Delete option from options array
    poll.options.splice(index, 1);

    //Save
    poll.save().then(poll => res.json(poll));

});

function findOption(poll: IPollDocument, optId: string) {
    const targetIndex = poll.options
        .map(option => option.refId)
        .indexOf(optId)
    let error = ''
    if (targetIndex === -1) {
        error = 'There is no option for this ID'
    }
    return {
        option: poll.options[targetIndex],
        index: targetIndex,
        error
    }
}

export default router;