import * as express from 'express';
const router = express.Router({ mergeParams: true });
import * as passport from 'passport';
import { createRefId } from '../../utilities/cryptoGenerators';
import { ApiError } from '../../utilities/ApiError';
import { findPoll, findUserById } from "../../utilities/dataBaseUtilities";

//Load Models
import { IPollDocument } from '../../models/Poll';
import { IJwtPayload } from 'src/interfaces';


//@route    POST api/polls/:poll_id/options
//@desc     Create // TODO : Include Edit to this request
//@access   Private // TODO: Make route private
router.post('/', async (req, res) => {
    const poll = await findPoll(req.params.poll_id)
    const refId = createRefId();
    const optionCreator = await findUserById(req.body.userId)

    const newOpt = {
        title: req.body.title,
        creator: optionCreator._id,
        description: req.body.description,
        refId,
        votes: []
    };

    poll.options.unshift(newOpt);

    poll.save().then(poll => res.json(poll.options[0]))
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