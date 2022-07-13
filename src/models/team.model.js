import mongoose from './mongoose.js'
const rolesEnum = ['admin', 'member']

const Schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      default: '',
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    users: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
        },
        role: {
          type: String,
          default: 'member',
          enum: rolesEnum,
        },
      },
    ],
    invitations: [
      {
        invitation: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Invitation',
        },
        role: {
          type: String,
          default: 'member',
          enum: rolesEnum,
        },
      },
    ],
  },
  {
    timestamps: true,
  },
)
Schema.index({ name: 1, owner: 1 }, { unique: true })

export default mongoose.model('Team', Schema)
