import * as mongoose from 'mongoose';
import { ObjectId } from 'mongodb';
import { IOption } from '../../interfaces';

const Schema = mongoose.Schema;

// Export Interface

export interface IPollDocument extends mongoose.Document {
    title: string,
    description: string,
    refId: string,
    creatorToken: string,
    creator: ObjectId,
    creatorPseudonym: string,
    participants: IParticipant[],
    options: IOption[],
}

interface IParticipant {
    id: ObjectId,
    pseudonym: string,
    token: string
}

// Create Schema

const PollSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
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
    creatorPseudonym: {
        type: String,
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
        pseudonym: {
            type: String,
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
            rating: {
                type: Number,
                required: true
            }
        }]
    }]
},
    { bufferCommands: false });

export const Poll = mongoose.model<IPollDocument>('poll', PollSchema);
