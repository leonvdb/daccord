import { Strategy, ExtractJwt } from 'passport-jwt';
import { PassportStatic } from 'passport'
import { secretOrKey } from './secrets'
import { IJwtPayload } from 'src/interfaces';

const jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()

const opts = {
    jwtFromRequest,
    secretOrKey
};

export default (passport: PassportStatic) => {
    passport.use(new Strategy(opts, (jwtPayload: IJwtPayload, done) => {
        // TODO check if this is working
        return done(null, jwtPayload)
    }))
}