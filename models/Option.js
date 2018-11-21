const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create Schema

const OptionSchema = new Schema({ // TODO: Add Poll field
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
});

module.exports = Option = mongoose.model('option', OptionSchema);