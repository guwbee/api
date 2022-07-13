const debug = require('debug')('io:index')

module.exports = (server) => {
  let io = require('socket.io')(server, {
    cors: {
      origin: process.env.FRONT_URL,
      methods: ['GET', 'POST'],
    },
  })
  debug(`SocketURL: ${process.env.FRONT_URL}`)

  requireApp('io/status').init(io)

  return io
}

debug('loaded')
