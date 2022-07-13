import mongoose from './mongoose.js'
import bcrypt from 'bcryptjs'
import validator from 'validator'

const Schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      // unique: true,
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
    confirmationCode: String,
    confirmed: { type: Boolean, default: false },
    google: {
      id: String,
      token: String,
      email: String,
      name: String,
    },
    password: {
      type: String,
      select: false,
    },
    resetToken: {
      type: String,
      select: false,
    },
    resetTokenExpirationDate: {
      type: Date,
      select: false,
    },
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Customer',
    },
  },
  {
    timestamps: true,
  },
)

Schema.pre('save', function (next) {
  try {
    const user = this
    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next()

    if (!user.password) {
      next()
    }
    // generate a salt
    bcrypt.hash(user.password, 12, function (err, hash) {
      if (err) next(err)
      user.password = hash
      next()
    })
  } catch (err) {
    next(err)
  }
})

Schema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password)
}

// module.exports = mongoose.model('User', Schema)
export default mongoose.model('User', Schema)
