import { FatalError } from '../../utilities/errors/FatalError';

export const helmet = (resolver: (...args: any[]) => any) => async (...args: any) => {
    try {
        return await resolver(...args)
    } catch (error) {
        if (error) {
            return new FatalError({ data: { reason: error.message } })
        }
    }
}