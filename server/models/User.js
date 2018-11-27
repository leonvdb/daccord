const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create Schema

const UserSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    name: {
        type: String,
    },
    password: {
        type: String
    },
    registered: {
        type: Boolean,
        default: false
    }
});

module.exports = User = mongoose.model('user', UserSchema);