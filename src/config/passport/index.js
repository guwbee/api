import dotenv from 'dotenv-safe'
import passport from 'passport'

dotenv.config()

import { Strategy, ExtractJwt } from 'passport-jwt'

// load up the user model
// const UserModel = requireApp('models/user.model')

const jwtOpts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken('jwt'),
  secretOrKey: process.env.SECRET,
}

const jwtFn = async (jwtPayload, done) => {
  try {
    console.log(jwtPayload)
    done(null, jwtPayload)
    // const user = await UserModel.findById(jwtPayload._id).lean()
    // if (user) {
    //   done(null, user)
    // } else {
    //   done(null, false)
    // }
  } catch (err) {
    if (err) {
      return done(err, false)
    }
  }
}

passport.use(new Strategy(jwtOpts, jwtFn))

// module.exports = passport
export default passport
