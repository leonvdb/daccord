import { Strategy, ExtractJwt } from 'passport-jwt';
import { PassportStatic } from 'passport'
import { secretOrKey } from './secrets'

const jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()

const opts = {
    jwtFromRequest,
    secretOrKey
};

export default (passport: PassportStatic) => {
    passport.use(new Strategy(opts, (jwtPayload, done) => {
        const user = {
            userId: jwtPayload.userId,
            accountLogin: jwtPayload.accountLogin
        }
        return done(null, user)
    }))
}