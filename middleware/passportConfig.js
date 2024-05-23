const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const userSchema = require('../schema/userSchema');
const logger = require('../logger/logger');

const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET
}

module.exports = (passport) => {
    passport.use(
        new JwtStrategy(opts, async (jwtPayload, done) => {
            try {
                const user = await userSchema.findOne({ username: jwtPayload.username });
                if (user) {
                    return done(null, user);
                }
                return done(null, false);
            } catch (err) {
                logger.error(err);
                return done(err, false);
            }
        })
    )
}