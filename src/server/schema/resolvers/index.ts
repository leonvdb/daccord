import { merge } from 'lodash';
import { resolvers as userResolvers } from './user';
import { resolvers as pollResolvers } from './poll';

const resolvers = merge(userResolvers, pollResolvers);

export default resolvers;