import * as express from 'express';
const router = express.Router();
import createRefId from '../../utilities/createRefId';

//Load Models
import { Poll, IPollModel } from '../../models/Poll';
import { User, IUserModel } from '../../models/User';


//declare interfaces 

interface PollFields {
    title?: string
}

//@route    POST api/polls
//@desc     Creates new poll. If Email-address unknown creates new User in database.
//@access   Public
router.post('/', (req, res) => {

    // Check if email corresponds to User in DB
    User.findOne({ email: req.body.email }).then((user: IUserModel) => {
        if (user) {
            // Create new poll with user.id
            createNewPoll(user);
        } else {
            //No corresponding user - Create new User
            const newUser = new User({
                email: req.body.email
            });

            //Save new User and create new poll with user.id
            newUser
                .save()
                .then((user: IUserModel) => createNewPoll(user))
        }
    })

    async function createNewPoll(user: IUserModel): Promise<void> {

        const refId = createRefId();

        const newPoll = new Poll({
            title: req.body.title,
            creator: user.id,
            refId
        });

        //Save new poll
        try {
            const poll = await newPoll.save()
            user.polls.push(poll._id)
            await user.save()
            res.json(poll)
        } catch (error) {
            res.json(error)
        }
    }
});

//@route    GET api/polls/:poll_id
//@desc     GET poll by id
//@access   Private // TODO: Make route private
router.get('/:poll_id', (req, res) => {
    Poll.findOne({ refId: req.params.poll_id })
        .then((poll: IPollModel) => {
            if (!poll) return res.status(404).json({ 'msg': 'There is no poll for this ID' });
            return res.json(poll)
        })
        .catch((err: Error) => res.json(err));
});

//@route    PUT api/polls/:poll_id
//@desc     Edit poll
//@access   Private // TODO: Make route private
router.put('/:poll_id', (req, res) => {

    // Collect request body data
    const pollFields: PollFields = {};
    if (req.body.title) pollFields.title = req.body.title;

    //Update poll
    Poll.findOneAndUpdate(
        { refId: req.params.poll_id },
        pollFields,
        { new: true }
    )
        .then((poll: IPollModel) => {
            if (!poll) return res.status(404).json({ 'msg': 'There is no poll for this ID' });
            return res.json(poll)
        })
        .catch((err: Error) => {
            console.log("fail")
            return res.json(err)
        });
});

//@route    DELETE api/polls/:poll_id
//@desc     Delete poll
//@access   Private // TODO: Make route private
router.delete('/:poll_id', (req, res) => {
    Poll.findOneAndRemove({ refId: req.params.poll_id })
        .then((poll: IPollModel) => {
            if (!poll) return res.status(404).json({ 'msg': 'There is no poll for this ID' });
            return res.json({ success: true });
        })
        .catch((err: Error) => res.json(err));
});


export default router;