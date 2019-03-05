import { merge } from 'lodash';
import { resolvers as userResolvers } from './user';
import { resolvers as pollResolvers } from './poll';
import { resolvers as authResolvers } from './authentication'

const resolvers = merge(userResolvers, pollResolvers, authResolvers);

export default resolvers;