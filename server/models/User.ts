import * as mongoose from 'mongoose';
import { ObjectId } from 'mongodb';
const Schema = mongoose.Schema;

//Export Interface
export interface IUserModel extends mongoose.Document {
    email: String,
    name?: String,
    password?: String,
    registered: Boolean,
    polls: ObjectId[]
}

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
    },
    polls: [{
        type: Schema.Types.ObjectId,
        ref: 'poll'
    }]
});

const User = mongoose.model('user', UserSchema);

module.exports = User