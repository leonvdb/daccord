import * as express from 'express';
const router = express.Router({ mergeParams: true });
import createRefId from '../../utilities/createRefId';
import { ApiError } from '../../utilities/ApiError';
import { createJsonWebToken, sendConfirmMail, findPoll, generateToken, findUser } from './polls'

//Load Models
import { Poll, IPollDocument } from '../../models/Poll';

//@route    POST api/polls/:poll_id/options
//@desc     Create // TODO : Include Edit to this request
//@access   Private // TODO: Make route private
router.post('/', async (req, res, next) => {

    const poll = await findPoll(req.params.poll_id)
    if (!poll) return next(new ApiError('There is no poll for this ID', 404))


    //Check if user logged in and set creatorId
    let creatorId;
    let loggedIn = false;
    if (req.body.userId) {
        //If user is in state userId will be supplied in Request Object
        loggedIn = true;
        creatorId = req.body.userId
    } else if (req.body.email) {
        //If user is not yet logged in User has to supply email
        const creator = await findUser(req.body.email)
        creatorId = creator._id
    } else return next(new ApiError('Supply userId or Email', 400))


    //Check if creatorParticipating
    let creatorParticipating = false
    let creatorPosition = -1
    if (poll.creator.toString() === creatorId.toString()) {
        creatorParticipating = true
    };
    for (let i = 0; i < poll.participants.length; i++) {
        if (poll.participants[i].participantId.toString() === creatorId.toString()) {
            creatorParticipating = true
            creatorPosition = i
        }
    }

    if (!loggedIn && creatorParticipating) {
        if (req.body.requestLink) {
            if (poll.creator.toString() === creatorId.toString()) {
                //CASE: PollCreator not logged in, asking for link
                sendConfirmMail(
                    req.body.email,
                    poll,
                    'resendCreator',
                    poll.creatorToken
                )
            } else {
                //CASE: User not logged in, participating, asking for link
                sendConfirmMail(
                    req.body.email,
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
            return next(new ApiError('Participant already exists - Authenticate or request new link.', 401))
        }
    }

    let newJWT = '';
    if (!creatorParticipating) {
        //CASE: User not logged in, not participating - give token
        //CASE: User logged in, not participating - give new token

        //Add user to participants
        const newParticipant = {
            participantId: creatorId,
            participantToken: generateToken()
        }

        //Send email to new user
        sendConfirmMail(req.body.email, poll, 'becomeNewParticipant', newParticipant.participantToken)

        poll.participants.push(newParticipant)

        if (!loggedIn) {
            //JWT is created for user and will be returned in Request Object
            newJWT = createJsonWebToken(creatorId, 'PARTICIPANT', false, poll.refId)
        }
    }

    //Add option to poll
    const refId = createRefId();
    const newOpt = {
        title: req.body.title,
        creator: creatorId,
        description: req.body.description,
        refId,
        votes: []
    };
    poll.options.unshift(newOpt);


    poll.save().then(poll => {

        //If user is not in State and thus JWT was created,
        //include it in the json response object
        if (newJWT) {
            res.json({
                option: poll.options[0],
                token: newJWT
            })
        }
        res.json(poll.options[0])
    })
        .catch(err => res.json(err));


});

//@route    GET api/polls/:poll_id/options
//@desc     GET all options of poll
//@access   Private // TODO: Make route private
router.get('/', (req, res) => {

    Poll.findOne({ refId: req.params.poll_id })
        .then((poll: IPollDocument) => {
            if (!poll) return res.status(404).json({ 'msg': 'There is no poll for this ID' });
            return res.json(poll.options)
        })
        .catch((err: Error) => res.json(err));


});

//@route    GET api/polls/:poll_id/options/:opt_id
//@desc     GET option by Id
//@access   Private // TODO: Make route private
router.get('/:opt_id', (req, res) => {

    Poll.findOne({ refId: req.params.poll_id })
        .then((poll: IPollDocument) => {
            if (!poll) return res.status(404).json({ 'msg': 'There is no poll for this ID' });
            const target = poll.options.find(option => option.refId === req.params.opt_id);
            if (!target) return res.status(404).json({ 'msg': 'There is no option for this ID' });
            return res.json(target)
        })
        .catch((err: Error) => res.json(err));


});

//@route    PUT api/polls/:poll_id/options/:opt_id
//@desc     Update option
//@access   Private // TODO: Make route private
router.put('/:opt_id', (req, res) => {
    Poll.findOne({ refId: req.params.poll_id })
        .then((poll: IPollDocument) => {
            if (!poll) return res.status(404).json({ 'msg': 'There is no poll for this ID' });
            const targetIndex = poll.options
                .map(option => option.refId)
                .indexOf(req.params.opt_id)

            if (targetIndex === -1) return res.status(404).json({ 'msg': 'There is no option for this ID' });

            //Update option
            if (req.body.title) poll.options[targetIndex].title = req.body.title;
            if (req.body.description) poll.options[targetIndex].description = req.body.description;

            //Save
            poll.save().then(poll => res.json(poll));
        })
        .catch((err: Error) => res.json(err));


});

//@route    DELETE api/polls/:poll_id/options/:opt_id
//@desc     Delete option
//@access   Private // TODO: Make route private
router.delete('/:opt_id', (req, res) => {

    Poll.findOne({ refId: req.params.poll_id })
        .then((poll: IPollDocument) => {
            if (!poll) return res.status(404).json({ 'msg': 'There is no poll for this ID' });
            const targetIndex = poll.options
                .map(option => option.refId)
                .indexOf(req.params.opt_id)

            if (targetIndex === -1) return res.status(404).json({ 'msg': 'There is no option for this ID' });

            //Delete option from options array
            poll.options.splice(targetIndex, 1);

            //Save
            poll.save().then(poll => res.json(poll));
        })
        .catch((err: Error) => res.json(err));


});

export default router;