import dotenv from 'dotenv-safe'
import createError from 'http-errors'
import express from 'express'
import path from 'path'
import cookieParser from 'cookie-parser'
import logger from 'morgan'
import bodyParser from 'body-parser'
import cors from 'cors'
import compression from 'compression'
import debug from 'debug'
import http from 'http'
import routes from './routes.js'

dotenv.config()

export const app = express()

/**
 * Create HTTP server.
 */

export const server = http.Server(app)

// DB
import db from './config/db.js'
import errors from './errors.js'

db.on('error', function (error) {
  debug('b:database')(error)
  console.log('connection error: ')
  console.log(error)
})
db.once('open', function () {
  console.log('MongoDB connect')
  debug('b:database')('MongoDB connected')
})

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
//
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

const __dirname = path.resolve()

app.use(express.static(path.join(__dirname, 'public')))
app.use(bodyParser.json())
app.use(
  cors({
    origin: process.env.FRONT_URL || 'http://localhost:3000',
    credentials: true,
  }),
)
app.use(compression())

// ROUTES
app.use(routes)


// catch 404 and forward to error handler
app.use(function (_req, _res, next) {
  next(createError(404))
})

// error handler
app.use(errors)

export default { app, server }
