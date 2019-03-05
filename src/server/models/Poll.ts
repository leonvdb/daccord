import * as mongoose from 'mongoose';
import { ObjectId } from 'mongodb';
import { IOption } from '../../interfaces';

const Schema = mongoose.Schema;

// Export Interface

export interface IPollDocument extends mongoose.Document {
    title: string,
    refId: string,
    creatorToken: string,
    creator: ObjectId,
    participants: IParticipant[],
    options: IOption[],
}

interface IParticipant {
    id: ObjectId,
    token: string
}

// Create Schema

const PollSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    refId: {
        type: String,
        required: true
    },
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    creatorToken: {
        type: String,
        required: true
    },
    participants: [{
        id: {
            type: Schema.Types.ObjectId,
            required: true
        },
        token: {
            type: String
        }
    }],
    options: [{
        title: {
            type: String,
            required: true
        },
        creator: {
            type: Schema.Types.ObjectId,
            ref: 'user',
            required: true
        },
        refId: {
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
},
    { bufferCommands: false });

export const Poll = mongoose.model<IPollDocument>('poll', PollSchema);
