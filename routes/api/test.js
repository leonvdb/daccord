//To be deleted after review
const express = require('express');
const router = express.Router();


//@route    GET api/test
//@desc     Test route
//@access   Public
router.get('/', (req, res) => res.json({ test: "success" }));

module.exports = router;