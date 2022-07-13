const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    error: true,
    status: err.status,
    // error: err,
    message: err.message,
    // stack: err.stack,
  })
}

const sendErrorProd = (err, res) => {
  res.status(err.statusCode).json({
    error: true,
    status: err.status,
    message: err.message,
  })
}

export default (err, _req, res, next) => {
  err.statusCode = err.statusCode || 500
  err.status = err.status || 'error'

  if (process.env.NODE_ENV === 'dev') {
    sendErrorDev(err, res)
  } else {
    sendErrorProd(err, res)
  }
  next()
}
