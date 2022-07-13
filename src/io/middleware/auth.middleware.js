import jwt from 'jsonwebtoken'
import UserModel from '../../models/user.model.js'
import getUserTeamList from '../../services/getUserTeamList.js'
import lodash from 'lodash'
const { get } = lodash

export default async (socket, next) => {
  const token = get(socket.handshake, 'auth.token')

  let user = jwt.verify(token, process.env.SECRET)
  const rs = await UserModel.findById(user._id).lean()
  const teams = await getUserTeamList(user._id)

  socket.user = rs
  socket.user.teams = teams
  if (!socket.user) {
    return next(new Error('Unauthorized'))
  }
  next()
}
