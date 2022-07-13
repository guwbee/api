import { server } from './src/app.js'
import ws from './src/websockets.js'
import dbug from 'debug'

const debug = dbug('express-basic:server')
ws(server)

/**
 * Get port from environment and store in Express.
 */
var port = normalizePort(process.env.PORT || '8080')
// app.set('port', port)
console.log('\nReady & listening to http://localhost:' + port)
/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port)

server.on('error', onError)
server.on('listening', onListening)

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  var port = parseInt(val, 10)

  if (isNaN(port)) {
    // named pipe
    return val
  }

  if (port >= 0) {
    // port number
    return port
  }

  return false
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error
  }

  var bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port
  // handle specific listen errors with friendly messages
  switch (error.code) {
  case 'EACCES':
    console.error(bind + ' requires elevated privileges')
    return process.exit(1)
  case 'EADDRINUSE':
    console.error(bind + ' is already in use')
    return process.exit(1)
  default:
    throw error
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = server.address()
  var bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port
  debug('Listening on ' + bind)
}
