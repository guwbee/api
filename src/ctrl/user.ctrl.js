import dbug from 'debug'
import jwt from 'jsonwebtoken'
import userToJwt from '../utils/userToJwt.js'
import statusIO from '../io/status.js'
import UserModel from '../models/user.model.js'

// import dotenv from 'dotenv-safe'
// dotenv.config()

const debug = dbug('ctrl:user')
debug('loaded')
// router.post('/signup',
export default {
  createUser: async (req, res, next) => {
    try {
      const { name, email, password } = req.body

      // creates user
      const user = await UserModel.create({
        name,
        email,
        password,
        status: 'available',
      })
      const jwtUser = userToJwt(user)
      const token = jwt.sign(jwtUser, process.env.SECRET)

      statusIO.userAttach(jwtUser)

      res.json({
        user: jwtUser,
        token,
      })
    } catch (err) {
      next(err)
    }
  },
}
