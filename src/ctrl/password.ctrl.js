import dbug from 'debug'
// FIXME
import uuid from 'uuid'
import UserModel from '../models/user.model.js'
import AppError from '../utils/appError.js'
import Mail from '../mail/index.js'
import dotenv from 'dotenv-safe'

dotenv.config()
const debug = dbug('ctrl:password')

const frontEndUrl = process.env.FRONT_URL
const { v4: uuidv4 } = uuid

const { MAIL_SENDER_NAME, MAIL_SENDER_EMAIL } = process.env

debug('loaded')

export default {
  async resetPassword(req, res, next) {
    try {
      const { email } = req.body
      //in hours
      const tokenExpirationTime = 1

      //veryfing user
      const user = await UserModel.findOne({ email })
      if (!user) {
        throw new AppError('BAD_REQUEST', 'User not found.')
      }

      let token = uuidv4()
      let expirationDate = new Date()
      expirationDate.setHours(expirationDate.getHours() + tokenExpirationTime)

      user.resetToken = token
      user.resetTokenExpirationDate = expirationDate
      await user.save()

      const mail = new Mail({
        to: user.email,
        from: `${MAIL_SENDER_NAME} <${MAIL_SENDER_EMAIL}>`,
        subject: 'Recuperação de senha',
        template: 'reset-password',
        data: {
          name: user.name,
          link: `${frontEndUrl}/recover-password/${token} `,
        },
      })
      mail.send()
      res.json({ success: true })
    } catch (err) {
      next(err)
    }
  },
}
