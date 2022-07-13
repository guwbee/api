// const AppError = requireApp('utils/appError')
import dbug from 'debug'
import CourseModel from '../models/course.model.js'
const debug = dbug('routes:courses')

debug('loaded')

export default {
  async indexCourse(req, res, next) {
    try {
      const { user } = req
      // creates todo
      const items = await CourseModel.find({
        user: user._id,
      })

      res.json(items)
    } catch (err) {
      next(err)
    }
  },
  async createCourse(req, res, next) {
    try {
      const { user } = req

      const { name, description } = req.body

      const created = await CourseModel.create({
        name,
        description,
        user: user._id,
      })

      res.json(created)
    } catch (err) {
      next(err)
    }
  },
}
