const express = require('express');
const router = express.Router({ mergeParams: true });
const createRefId = require('../../utilities/createRefId');

//Load Poll Model
const Poll = require('../../models/Poll');

//@route    POST api/polls/:poll_id/options
//@desc     Create // TODO : Include Edit to this request
//@access   Private // TODO: Make route private
router.post('/', (req, res) => {

    Poll.findOne({ ref_id: req.params.poll_id })
        .then(poll => {
            if (!poll) return res.status(404).json({ 'msg': 'There is no poll for this ID' });

            const ref_id = createRefId();

            const newOpt = {
                title: req.body.title,
                description: req.body.description,
                ref_id
            };

            poll.options.unshift(newOpt);

            poll.save().then(poll => res.json(poll.options[0]))

        })
        .catch(err => res.json(err));


});

//@route    GET api/polls/:poll_id/options
//@desc     GET all options of poll
//@access   Private // TODO: Make route private
router.get('/', (req, res) => {

    Poll.findOne({ ref_id: req.params.poll_id })
        .then(poll => {
            if (!poll) return res.status(404).json({ 'msg': 'There is no poll for this ID' });
            return res.json(poll.options)
        })
        .catch(err => res.json(err));


});

//@route    GET api/polls/:poll_id/options/:opt_id
//@desc     GET option by Id
//@access   Private // TODO: Make route private
router.get('/:opt_id', (req, res) => {

    Poll.findOne({ ref_id: req.params.poll_id })
        .then(poll => {
            if (!poll) return res.status(404).json({ 'msg': 'There is no poll for this ID' });
            const target = poll.options.find(option => {
                if (option.ref_id === req.params.opt_id) {
                    return option
                }
            });
            if (!target) return res.status(404).json({ 'msg': 'There is no option for this ID' });
            return res.json(target)
        })
        .catch(err => res.json(err));


});

//@route    PUT api/polls/:poll_id/options/:opt_id
//@desc     Update option
//@access   Private // TODO: Make route private
router.put('/:opt_id', (req, res) => {
    Poll.findOne({ ref_id: req.params.poll_id })
        .then(poll => {
            if (!poll) return res.status(404).json({ 'msg': 'There is no poll for this ID' });
            const targetIndex = poll.options
                .map(option => option.ref_id)
                .indexOf(req.params.opt_id)

            if (targetIndex === -1) return res.status(404).json({ 'msg': 'There is no option for this ID' });

            //Update option
            if (req.body.title) poll.options[targetIndex].title = req.body.title;
            if (req.body.description) poll.options[targetIndex].description = req.body.description;

            //Save
            poll.save().then(poll => res.json(poll));
        })
        .catch(err => res.json(err));


});

//@route    DELETE api/polls/:poll_id/options/:opt_id
//@desc     Delete option
//@access   Private // TODO: Make route private
router.delete('/:opt_id', (req, res) => {

    Poll.findOne({ ref_id: req.params.poll_id })
        .then(poll => {
            if (!poll) return res.status(404).json({ 'msg': 'There is no poll for this ID' });
            const targetIndex = poll.options
                .map(option => option.ref_id)
                .indexOf(req.params.opt_id)

            if (targetIndex === -1) return res.status(404).json({ 'msg': 'There is no option for this ID' });

            //Delete option from options array
            poll.options.splice(targetIndex, 1);

            //Save
            poll.save().then(poll => res.json(poll));
        })
        .catch(err => res.json(err));


});

//router from options.js will be imported and used by
module.exports = router;