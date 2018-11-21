const express = require('express');
const router = express.Router();

//Load Option Model
const Option = require('../../models/Option');

//@route    POST api/options
//@desc     Create // TODO : Include Edit to this request
//@access   Private // TODO: Make route private
router.post('/', (req, res) => {
    const newOption = new Option({
        // TODO: Add author field
        // TODO: Add poll field
        title: req.body.title,
        description: req.body.description

    });

    newOption
        .save()
        .then(option => res.json(option))
        .catch(err => res.json(err));
});

module.exports = router;