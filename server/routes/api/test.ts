//To be deleted after review
import * as express from 'express';
const router = express.Router();


//@route    GET api/test
//@desc     Test route
//@access   Public
router.get('/', (req, res) => res.json({ test: "success" }));

module.exports = router;