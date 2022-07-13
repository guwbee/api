import dbug from 'debug'
import mongoose from 'mongoose'
const debug = dbug('express:database')

const dbString = process.env.DB_STRING

const mongoUrl = dbString ? dbString : 'mongodb://localhost:27017/youbiyn'
debug('setting mongoURL to be:', mongoUrl)

mongoose.connect(mongoUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: true,
  dbName: process.env.DB_NAME,
})
mongoose.set('useCreateIndex', true)

export default mongoose.connection
