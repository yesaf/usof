const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt')
const keys = require("../config/keys");
const User = require('../models/user');

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: keys.jwt
}

module.exports = (passport) => {
  passport.use(
    new JwtStrategy(options, async (payload, done) => {
      try {
        const [user] = await User.findUserByEmail(payload.email);

        if (user) {
          done(null, user)
        } else {
          done(null, false)
        }
      } catch (e) {
        console.log(e);
      }
    })
  )
}
