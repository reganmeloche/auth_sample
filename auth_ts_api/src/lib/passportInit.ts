import passport from "passport";
import passportLocal from "passport-local";
import passportJWT from "passport-jwt";
import keys from '../config/keys';
import IAuth from '../lib/IAuth';
import { ValidationError, NotFound } from '../common/Errors';

const LocalStrategy = passportLocal.Strategy;
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

export default function(authLib: IAuth) {
    const _auth = authLib;

    passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
    }, async (username: any, password: any, done: any) => {
        try {
            const user = await _auth.tryLogin(username, password);
            return done(null, user);
        }
        catch (err) {
            if (err instanceof NotFound || err instanceof ValidationError) {
                return done(err, false, { message: err.message});
            }
            return done(err, false);
        }
    }));
    
    passport.use(new JWTStrategy({
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
        secretOrKey: keys.jwtSecret
    }, (jwtPayload: any, done: any) => {
        return done(null, jwtPayload);
    }));
}