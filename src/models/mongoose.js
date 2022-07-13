import mongooseDelete from 'mongoose-delete'
import mongoose from 'mongoose'

mongoose.plugin(mongooseDelete, {
  overrideMethods: true,
  deletedAt: true,
})

// module.exports = mongoose
export default mongoose
