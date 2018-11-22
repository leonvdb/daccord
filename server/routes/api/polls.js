const express = require('express');
const router = express.Router();

//Load Option Model
const Poll = require('../../models/Poll');

/*-------------------------------------------
              REQUESTS TO POLL
-------------------------------------------*/


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

//@route    PUT api/polls/:poll_id
//@desc     Edit poll
//@access   Private // TODO: Make route private
router.put('/:poll_id', (req, res) => {

    // Collect request body data
    const pollFields = {};
    if (req.body.title) pollFields.title = req.body.title;


    Poll.findById(req.params.poll_id)
        .then(poll => {
            if (!poll) return res.status(404).json({ 'msg': 'There is no poll for this ID' });

            //Update poll
            Poll.findByIdAndUpdate(
                req.params.poll_id,
                pollFields,
                { new: true }
            )
                .then(poll => {
                    res.json(poll)
                })
                .catch(err => {
                    console.log("fail")
                    res.json(err)
                });
        })
        .catch(err => res.json(err));
});

//@route    DELETE api/polls/:poll_id
//@desc     Delete poll
//@access   Private // TODO: Make route private
router.delete('/:poll_id', (req, res) => {
    Poll.findByIdAndRemove(req.params.poll_id)
        .then(poll => {
            if (!poll) return res.status(404).json({ 'msg': 'There is no poll for this ID' });
            return res.json({ success: true });
        })
        .catch(err => res.json(err));
});

/*-------------------------------------------
            REQUESTS TO OPTIONS
-------------------------------------------*/


//@route    POST api/polls/:poll_id/options
//@desc     Create // TODO : Include Edit to this request
//@access   Private // TODO: Make route private
router.post('/:poll_id/options', (req, res) => {

    Poll.findById(req.params.poll_id)
        .then(poll => {
            if (!poll) return res.status(404).json({ 'msg': 'There is no poll for this ID' });
            const newOpt = {
                title: req.body.title,
                description: req.body.description
            };

            poll.options.push(newOpt);

            poll.save().then(poll => res.json(poll))

        })
        .catch(err => res.json(err));


});

//@route    GET api/polls/:poll_id/options
//@desc     GET all options of poll
//@access   Private // TODO: Make route private
router.get('/:poll_id/options', (req, res) => {

    Poll.findById(req.params.poll_id)
        .then(poll => {
            if (!poll) return res.status(404).json({ 'msg': 'There is no poll for this ID' });
            return res.json(poll.options)
        })
        .catch(err => res.json(err));


});

//@route    GET api/polls/:poll_id/options/:opt_id
//@desc     GET option by Id
//@access   Private // TODO: Make route private
router.get('/:poll_id/options/:opt_id', (req, res) => {

    Poll.findById(req.params.poll_id)
        .then(poll => {
            if (!poll) return res.status(404).json({ 'msg': 'There is no poll for this ID' });
            const target = poll.options.find(option => {
                if (option.id === req.params.opt_id) {
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
router.put('/:poll_id/options/:opt_id', (req, res) => {

    Poll.findById(req.params.poll_id)
        .then(poll => {
            if (!poll) return res.status(404).json({ 'msg': 'There is no poll for this ID' });
            const targetIndex = poll.options
                .map(option => option.id)
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
router.delete('/:poll_id/options/:opt_id', (req, res) => {

    Poll.findById(req.params.poll_id)
        .then(poll => {
            if (!poll) return res.status(404).json({ 'msg': 'There is no poll for this ID' });
            const targetIndex = poll.options
                .map(option => option.id)
                .indexOf(req.params.opt_id)

            if (targetIndex === -1) return res.status(404).json({ 'msg': 'There is no option for this ID' });

            //Delete option from options array
            poll.options.splice(targetIndex, 1);

            //Save
            poll.save().then(poll => res.json(poll));
        })
        .catch(err => res.json(err));


});


module.exports = router;