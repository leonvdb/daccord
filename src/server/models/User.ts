import * as mongoose from 'mongoose';
import { ObjectId } from 'mongodb';
import { IUser } from '../../interfaces';
const Schema = mongoose.Schema;

// Export Interface
export interface IUserDocument extends mongoose.Document {
    _id: ObjectId,
    email: string,
    name?: string,
    password?: string,
    registered: boolean,
    polls: ObjectId[],
    getUserForFrontend: () => IUser
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
},
    { bufferCommands: false });


UserSchema.methods.getUserForFrontend = function (): IUser {
    return {
        id: this._id.toHexString(),
        email: this.email,
        name: this.name
    }
}

export const User = mongoose.model<IUserDocument>('user', UserSchema);
