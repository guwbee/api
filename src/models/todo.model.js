const mongoose = require('./mongoose')

const Schema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    default: '',
  },
  description: {
    type: String,
    default: '',
  },
  checked: {
    type: Boolean,
    default: false
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  team: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Team',
  },
},
{
  timestamps: true,
})

module.exports = mongoose.model('Todo', Schema)
