const mongoose = require('./mongoose')
const validator = require('validator')

const Schema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    validate: (value) => {
      return validator.isEmail(value)
    },
  },
  link: {
    type: String,
    required: true,
  },
  token: {
    type: String,
    required: true,
  },
  accepted: {
    type: Boolean,
    default: false,
  },
  active: {
    type: Boolean,
    default: true,
  },
  senderUser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  team: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Team',
    required: true,
  },
},
{
  timestamps: true,
},
)

module.exports = mongoose.model('Invitation', Schema)
