import mongoose from './mongoose.js'
// const validator = require('validator')

const Schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      default: '',
    },
    description: {
      type: String,
      default: '',
    },
    students: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    lessons: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Lesson',
      },
    ],
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  },
)

export default mongoose.model('Course', Schema)
