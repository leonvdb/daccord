import express from 'express';
const router = express.Router({ mergeParams: true });
import passport from 'passport';
import { createRefId } from '../../utilities/cryptoGenerators';
import { ApiError } from '../../utilities/ApiError';
import { findPoll, findUserById, findOption } from "../../utilities/dataBaseUtilities";

//Load Models
import { IJwtPayload, IOption } from 'src/interfaces';
import { ApiResponse } from '../../utilities/ApiResponse';


//@route    POST api/polls/:poll_id/options
//@desc     Create // TODO : Include Edit to this request
//@access   Private // TODO: Make route private
router.post('/', async (req, res, next) => {
    const poll = await findPoll(req.params.poll_id)
    const refId = createRefId();
    const optionCreator = await findUserById(req.body.userId)

    const newOpt = {
        title: req.body.title,
        creator: optionCreator._id.toHexString(),
        description: req.body.description,
        refId,
        votes: []
    };

    poll.options.unshift(newOpt);

    poll.save()
        .then(poll => res.json(new ApiResponse<IOption>(poll.options[0])))
        .catch(err => next(new ApiError(err)));


});

//@route    GET api/polls/:poll_id/options
//@desc     GET all options of poll
//@access   Private // TODO: Make route private
router.get('/', async (req, res, next) => {

    try {
        const poll = await findPoll(req.params.poll_id)
        if (!poll) next(new ApiError('POLL_NOT_FOUND', 404))
        return res.json(new ApiResponse(poll.options))
    } catch (error) {
        return next(new ApiError(error))
    }

});

//@route    GET api/polls/:poll_id/options/:opt_id
//@desc     GET option by Id
//@access   Private // TODO: Make route private
router.get('/:opt_id', async (req, res, next) => {

    const poll = await findPoll(req.params.poll_id)
    const { option, error } = findOption(poll, req.params.opt_id)
    if (error) next(new ApiError(error, 404))
    return res.json(new ApiResponse(option))

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
        jwtPayload.forPollId !== req.params.poll_id ||
        jwtPayload.userId.toString() !== option.creator.toString()
    ) {
        return next(new ApiError('Incorrect Token', 401));
    }


    //Update option
    poll.options[index].title = req.body.title;
    poll.options[index].description = req.body.description;

    //Save
    poll.save()
        .then(poll => res.json(new ApiResponse(poll.options[index])))
        .catch(error => next(new ApiError(error)))

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
        jwtPayload.forPollId !== req.params.poll_id ||
        jwtPayload.userId.toString() !== option.creator.toString()
    ) {
        return next(new ApiError('Incorrect Token', 401));
    }

    //Delete option from options array
    poll.options.splice(index, 1);

    //Save
    try {
        await poll.save()
        return res.json(new ApiResponse())
    } catch (error) {
        return next(new ApiError('Entry could not be saved'))
    }

});

export default router;