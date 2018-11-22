const express = require('express');
const router = express.Router();

//Load Option Model
const Poll = require('../../models/Poll');

//@route    POST api/polls
//@desc     Create // TODO : Include Edit to this request
//@access   Private // TODO: Make route private
router.post('/', (req, res) => {
    const newPoll = new Poll({
        title: req.body.title
    });

    newPoll
        .save()
        .then(poll => res.json(poll))
        .catch(err => res.json(err));
});

//@route    GET api/polls/:poll_id
//@desc     GET poll by id
//@access   Private // TODO: Make route private
router.get('/:poll_id', (req, res) => {
    Poll.findById(req.params.poll_id)
        .then(poll => {
            if (!poll) return res.status(404).json({ 'msg': 'There is no poll for this ID' });
            return res.json(poll)
        })
        .catch(err => res.json(err));
});


//@route    POST api/polls/:poll_id/options
//@desc     Create // TODO : Include Edit to this request
//@access   Private // TODO: Make route private
router.post('/:poll_id/options', (req, res) => {

    Poll.findById(req.params.poll_id)
        .then(poll => {
            const newOpt = {
                title: req.body.title,
                description: req.body.description
            };

            poll.options.push(newOpt);

            poll.save().then(poll => res.json(poll))

        })


});


module.exports = router;