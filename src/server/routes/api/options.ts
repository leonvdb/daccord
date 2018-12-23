import * as express from 'express';
const router = express.Router({ mergeParams: true });
import createRefId from '../../utilities/createRefId';
import { ApiError } from '../../utilities/ApiError';
import { createUser, createJsonWebToken, sendConfirmMail, findPoll, generateToken } from './polls'

//Load Models
import { Poll, IPollDocument } from '../../models/Poll';

//@route    POST api/polls/:poll_id/options
//@desc     Create // TODO : Include Edit to this request
//@access   Private // TODO: Make route private
router.post('/', async (req, res, next) => {

    const poll = await findPoll(req.params.poll_id)

    if (!poll) return next(new ApiError('There is no poll for this ID', 404))
    let creatorId;
    let newJWT = '';
    const refId = createRefId();
    if (req.body.userId) {
        //If user is in state userId will be supplied in Request Object
        creatorId = req.body.userId
    } else if (req.body.email) {
        //If user is not yet logged in User has to supply email and new user is created
        const creator = await createUser(req.body.email)
        creatorId = creator._id

        //JWT is created for user
        newJWT = createJsonWebToken(creatorId, 'PARTICIPANT', false, poll.refId)

        //Send email to new user
        sendConfirmMail(req.body.email, poll, 'becomeNewParticipant')

    } else return next(new ApiError('No User found', 404))

    //Check if option creator is in poll participants
    let creatorInParticipants = false
    for (let i = 0; i < poll.participants.length; i++) {
        if (poll.participants[i].participantId.toString() === creatorId.toString()) {
            creatorInParticipants = true
        }
    }

    if (!creatorInParticipants && poll.creator !== creatorId) {

        //Add user to participants
        const newParticipant = {
            participantId: creatorId,
            participantToken: generateToken()
        }

        poll.participants.push(newParticipant)

    }

    //Add option to poll
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