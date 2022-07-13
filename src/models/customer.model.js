const mongoose = require('./mongoose')
const validator = require('validator')

const Schema = new mongoose.Schema({
  firstName: {
    type: String,
    default: '',
  },
  lastName: {
    type: String,
    default: '',
  },
  email: {
    type: String,
    required: true,
    unique: true,
    default: '',
    validate: (value) => {
      return validator.isEmail(value)
    },
  },
  phoneArea: {
    type: String,
    default: '',
  },
  phoneNumber: {
    type: String,
    default: '',
  },
  idType: {
    type: String,
    default: 'CPF',
    enum: ['CPF'],
  },
  idNumber: {
    type: String,
    default: '',
  },
  addressZip: { type: String, default: '' },
  addressStreet: { type: String, default: '' },
  addressNumber: { type: String, default: '' },
  description:    { type: String, default: '' },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
},
{
  timestamps: true,
})

module.exports = mongoose.model('Customer', Schema)
