import dbug from 'debug'
// import dayjs from 'dayjs'
//
import AppError from '../utils/appError.js'
import UserModel from '../models/user.model.js'
import statusIO from '../io/status.js'

const debug = dbug('routes:me.get')

export default {
  index: async (req, res, next) => {
    try {
      // const { account } = req.session
      // console.log(account.customerInfo)
      // await agilems.getSubscriptions(get(account.customerInfo, 'customerId'))
      // const customerInfo = get(account, 'customerInfo')
      // const _yolo =  await agilems.checkPaymentStatus(get(customerInfo, 'customerId'), get(customerInfo, 'paymentInfoId'))

      // await agilems.approveBillRun('1145')
      // post run/bills/1145/invoices/post

      // if(!account) { throw new AppError('BAD_REQUEST', 'invalid token, account not found') }
      return res.json(req.user)
    } catch (err) {
      next(err)
    }
  },
  create: async (req, res, next) => {
    try {
      const { _id } = req.user
      const { status } = req.body

      let user = await UserModel.findById(_id)
      if (!user) {
        throw new AppError('UNAUTHORIZED', '')
      }

      if (status) {
        user.status = status
        await user.save()
      }

      // const statusIO = new StatusIO(res.io)
      // statusIO.changeStatus(user)

      statusIO.changeStatus(user.toObject())

      res.json(user)
    } catch (err) {
      next(err)
    }
  },
}

debug('loaded')
