import * as mongoose from 'mongoose';
import { ObjectId } from 'mongodb';
const Schema = mongoose.Schema;

// Export Interface
export interface IUserModel extends mongoose.Document {
    email: string,
    name?: string,
    password?: string,
    registered: boolean,
    polls: ObjectId[]
}

// Create Schema

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

export const User = mongoose.model('user', UserSchema);
