const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create Schema

const PollSchema = new Schema({
    title: {
        type: String,
        required: True
    },
    options: [{
        type: Schema.Types.ObjectId,
        ref: 'option'
    }]
});

module.exports = Poll = mongoose.model('poll', PollSchema);