const mongoose = require('./mongoose')
// const validator = require('validator')

const Schema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    default: '',
  },
  isLive: {
    type: Boolean,
    default: false,
  },
  date: {
    type: Date,
    default: null,
  },
  link: {
    type: String,
    default: '',
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
  },
},
{
  timestamps: true,
})

module.exports = mongoose.model('Lesson', Schema)
