import lodash from 'lodash'
import UserModel from '../models/user.model.js'
const { pick } = lodash

const fields = ['_id', 'email', 'name', 'confirmed']

export default (user) => {
  if (user instanceof UserModel) {
    return pick(user.toJSON(), fields)
  }
  return pick(user, fields)
}
