const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create Schema

const PollSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    options: [{
        title: {
            type: String,
            required: true
        },
        description: {
            type: String
        },
        votes: [{
            voter: {
                type: Schema.Types.ObjectId,
                required: true
            },
            vote: {
                type: Number,
                required: true
            }
        }]
    }]
});

module.exports = Poll = mongoose.model('poll', PollSchema);