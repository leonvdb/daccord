import { User, IUserDocument } from '../models/User';
import { Poll, IPollDocument } from '../models/Poll';
import { ApiError } from './ApiError';
import { ObjectID } from 'bson';


export function findOrCreateUser(email: string) {
    return User.findOne({ email })
        .then((user: IUserDocument) => {
            if (!user) {
                // Create new poll with user.id
                return createUser(email);
            }
            return user;
        });
}

export function findUserById(userId: string) {
    return User.findById(userId)
        .then((user: IUserDocument) => {
            if (!user) {
                // Create new poll with user.id
                const message = `There is no user for the ID ${userId}`
                Promise.reject(message)
            }
            return user;
        });
}


function createUser(email: string): Promise<IUserDocument> {
    //No corresponding user - Create new User
    const newUser = new User({
        email
    });

    //Save new User and create new poll with user.id
    return newUser.save()
        .then((user: IUserDocument) => user)

}

export function findPoll(pollId: string) {
    return Poll.findOne({ refId: pollId })
        .then(validatePoll)
        .catch();
}

export function findOption(poll: IPollDocument, optId: string) {
    const targetIndex = poll.options
        .map(option => option.refId)
        .indexOf(optId)
    if (targetIndex === -1) {
        throw new ApiError("Option not found", 404)
    }
    return {
        option: poll.options[targetIndex],
        index: targetIndex,
    }
}

function validatePoll(poll: IPollDocument, ): IPollDocument {
    //Check if poll exists
    if (!poll) {
        // This should work because it is handled by the asnycHandler middleware
        throw new ApiError("Poll not found", 404)
    }
    //Check if user exists
    return poll
}

export async function getUser(userId: string | ObjectID){
    const user = {
        id: '',
        email: ''
    }
    const userFromDB = await User.findById(userId)
    if (userFromDB) {
        user.email = userFromDB.email
        user.id = userFromDB.id
    }
    return user
}

export function isParticipating(poll: IPollDocument, userId: string){
    if(userId === poll.creator.toString()) return "CREATOR"
    for (const participant of poll.participants){
        if (participant.id.toString() === userId) return "PARTICIPANT"
    }
    return false
}

export function getParticipantPosition(poll: IPollDocument, user: IUserDocument){
    if (poll.creator.toString() === user.id) return -2
    for (const [index, participant] of poll.participants.entries()){
        console.log({participant: participant.id})
        if (participant.id.toString() === user._id.toString()) {
            return index
        }
    }
    return -1
}