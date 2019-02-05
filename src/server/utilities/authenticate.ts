import { IJwtPayloadUser } from '../../interfaces';
import { AuthenticationError } from 'apollo-server-core';

export const authenticate = (user: IJwtPayloadUser, authorizedUserId?: string) => {
    if (!user) throw new AuthenticationError("Unauthorized")
    if (authorizedUserId) {
        if (authorizedUserId !== user.id) throw new AuthenticationError("Unauthorized")
    }
}