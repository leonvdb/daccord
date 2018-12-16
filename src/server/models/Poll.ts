import * as mongoose from 'mongoose';
import { ObjectId } from 'mongodb';
import { Options } from '../../interfaces';

const Schema = mongoose.Schema;

// Export Interface

export interface IPollModel extends mongoose.Document {
    title: string,
    refId: string,
    creator: ObjectId,
    options: Options[],

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
    options: [{
        title: {
            type: String,
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
});

export const Poll = mongoose.model('poll', PollSchema);
