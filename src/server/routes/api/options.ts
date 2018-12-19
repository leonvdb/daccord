import * as express from 'express';
const router = express.Router({ mergeParams: true });
import createRefId from '../../utilities/createRefId';

//Load Models
import { Poll, IPollDocument } from '../../models/Poll';

//@route    POST api/polls/:poll_id/options
//@desc     Create // TODO : Include Edit to this request
//@access   Private // TODO: Make route private
router.post('/', (req, res) => {

    Poll.findOne({ refId: req.params.poll_id })
        .then((poll: IPollDocument) => {
            if (!poll) return res.status(404).json({ 'msg': 'There is no poll for this ID' });

            const refId = createRefId();

            const newOpt = {
                title: req.body.title,
                description: req.body.description,
                refId,
                votes: []
            };

            poll.options.unshift(newOpt);

            poll.save().then(poll => res.json(poll.options[0]))

        })
        .catch((err: Error) => res.json(err));


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