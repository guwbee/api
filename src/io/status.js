import dbug from 'debug'
import lodash from 'lodash'
const { get, uniqBy, each, pick, map } = lodash
const debug = dbug('io:status')

import auth from '../io/middleware/auth.middleware.js'
import getUserTeamList from '../services/getUserTeamList.js'

let clients = []

const userFields = ['_id', 'name', 'status']
let socket = { emit: () => {} }
let io

let statusIO = {
  userAttach(user) {
    socket.emit('attach', pick(user, userFields))
  },
  userDetach(user) {
    socket.broadcast.emit(
      'detach',
      pick({ ...user, status: 'unavailable' }, userFields),
    )
  },

  onlineUsers(users) {
    socket.emit('onlineUsers', users)
  },

  auth() {
    socket.emit('auth')
  },

  async changeStatus(user) {
    const teams = map(await getUserTeamList(user._id), '_id')
    each(teams, (t) => {
      io.to(t.toString()).emit('change', pick(user, userFields))
    })
  },
}

const init = (IO) => {
  io = IO.of('status')

  io.use(auth).on('connection', async (sio) => {
    socket = sio
    debug('connection')
    const user = get(socket, 'user')
    if (!user) {
      return
    }

    // const statusIO = new StatusIO(socket)

    // join the user rooms
    each(user.teams, function ({ _id }) {
      console.log(_id)
      console.log(`${user.name} joined ${_id}`)

      socket.join(_id.toString())
    })

    clients = uniqBy(
      clients.concat({
        socketId: socket.id,
        teams: user.teams || [],
        userId: user._id,
      }),
      'socketId',
    )

    statusIO.auth()

    socket.on('disconnect', async () => {
      // const user = await UserModel.findOne({_id: uid})
      // dispatcher.userDetach(user.toJSON())
    })
  })
}

export default {
  init,
  ...statusIO,
}

debug('loaded')
