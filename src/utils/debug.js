module.exports = (namespace) => {
  return {
    info:  require('debug')(`INFO: ${ namespace }`),
    error: require('debug')(`ERROR: ${ namespace }`),
    warn:  require('debug')(`WARN: ${ namespace }`),
  }
}
