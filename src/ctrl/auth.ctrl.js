import dbug from 'debug'
import jwt from 'jsonwebtoken'
const debug = dbug('routes:auth.ctrl')

import AppError from '../utils/appError.js'
import UserModel from '../models/user.model.js'
import userToJwt from '../utils/userToJwt.js'

debug('loaded')

export default {
  async createAuth(req, res, next) {
    try {
      const { email, password } = req.body

      // creates user
      const user = await UserModel.findOne({
        email,
      }).select('+password')

      if (!user) {
        throw new AppError(
          'BAD_REQUEST',
          'Authentication failed. User not found.',
        )
      }
      const isPasswordValid = await user.comparePassword(password)
      if (!isPasswordValid) {
        throw new AppError(
          'BAD_REQUEST',
          'Authentication failed. Wrong password.',
        )
      }

      const jwtUser = userToJwt(user)
      let token = jwt.sign(jwtUser, process.env.SECRET)

      res.io.of('status').emit('change', {
        name: user.name,
        status: 'available',
      })

      res.json({
        user: jwtUser,
        token: token,
      })
    } catch (err) {
      next(err)
    }
  },

  async deleteAuth(req, res, next) {
    try {
      const { _id } = req.user

      let user = await UserModel.findById(_id)
      if (!user) {
        throw new AppError('UNAUTHORIZED', '')
      }

      user.status = 'unavailable'
      await user.save()

      res.io.of('status').emit('change', {
        name: user.name,
        status: 'unavailable',
      })

      res.json(user)
    } catch (err) {
      next(err)
    }
  },
}
