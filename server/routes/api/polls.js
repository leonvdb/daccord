const express = require('express');
const router = express.Router();

//Load Models
const Poll = require('../../models/Poll');
const User = require('../../models/User');

//@route    POST api/polls
//@desc     Creates new poll. If Email-address unknown creates new User in database.
//@access   Public
router.post('/', (req, res) => {

    // Check if email corresponds to User in DB
    User.findOne({ email: req.body.email }).then(user => {
        if (user) {
            // Create new poll with user.id
            createNewPoll(user.id);
        } else {
            //No corresponding user - Create new User
            const newUser = new User({
                email: req.body.email
            });

            //Save new User and create new poll with user.id
            newUser
                .save()
                .then(user => createNewPoll(user.id))
        }
    })

    function createNewPoll(userId) {

        const newPoll = new Poll({
            title: req.body.title,
            creator: userId
        });

        //Save and return new poll
        newPoll
            .save()
            .then(poll => res.json(poll))
            .catch(err => res.json(err));
    }
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


module.exports = router;