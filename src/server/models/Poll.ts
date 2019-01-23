import * as mongoose from 'mongoose';
import { ObjectId } from 'mongodb';
import { IOption, IPoll } from '../../interfaces';

const Schema = mongoose.Schema;

// Export Interface

export interface IPollDocument extends mongoose.Document {
    title: string,
    refId: string,
    creatorToken: string,
    creator: ObjectId,
    participants: IParticipant[],
    options: IOption[],
    getPollForFrontend: () => IPoll

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
});

PollSchema.methods.getPollForFrontend = function (): IPoll {
    // This is necessary to have the nexted documents as plain js objects and not mongoose documents
    const schemaObject: IPollDocument = this.toObject()
    return {
        title: schemaObject.title,
        refId: schemaObject.refId,
        creator: schemaObject.creator.toHexString(),
        options: schemaObject.options,
    }
}

export const Poll = mongoose.model<IPollDocument>('poll', PollSchema);
