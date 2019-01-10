import { User, IUserDocument } from '../models/User';
import { Poll, IPollDocument } from '../models/Poll';


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

function validatePoll(poll: IPollDocument, ): IPollDocument {
    //Check if poll exists
    if (!poll) {
        // This should work because it is handled by the asnycHandler middleware
        const message = 'There is no poll for this ID'
        Promise.reject(message)
    }
    //Check if user exists
    return poll
}