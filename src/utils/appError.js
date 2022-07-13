import httpStatus from 'http-status-codes'

export default class AppError extends Error {
  constructor(statusCode, message) {
    if (typeof statusCode === 'number') {
      super(message)
    } else {
      super(
        `
        ${message}
      `.trim(),
      )
    }

    this.statusCode =
      typeof statusCode === 'number' ? statusCode : httpStatus[statusCode]

    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error'
    this.isOperational = true

    Error.captureStackTrace(this, this.constructor)
  }
}
