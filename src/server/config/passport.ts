import { Strategy, ExtractJwt } from 'passport-jwt';
import { PassportStatic } from 'passport'
import { secretOrKey } from './secrets'
import { IJwtPayload } from '../../interfaces';
import { User } from '../models/User';

const jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()

const opts = {
    jwtFromRequest,
    secretOrKey
};

export default (passport: PassportStatic) => {
    passport.use(new Strategy(opts, async (jwtPayload: IJwtPayload, done) => {
        try {
            const user = await User.findById(jwtPayload.userId)
            if (user) {
                return done(null, user)
            } else {
                return done(null, false)
            }
        } catch (error) {
            return done(error)
        }
    }))
}