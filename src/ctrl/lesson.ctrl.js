// const AppError = requireApp('utils/appError')
import dbug from 'debug'
import LessonModel from '../models/lesson.model.js'
const debug = dbug('ctrl:lesson')
debug('loaded')

export default {
  async indexLesson(req, res, next) {
    try {
      const { user } = req
      const { idCourse } = req.params
      // creates todo
      const items = await LessonModel.find({
        user: user._id,
        course: idCourse,
      })

      res.json(items)
    } catch (err) {
      next(err)
    }
  },
  async createLesson(req, res, next) {
    try {
      const { user } = req
      const { title, date, link } = req.body
      const { idCourse } = req.params

      const created = await LessonModel.create({
        title,
        date,
        link,
        course: idCourse,
        user: user._id,
      })

      res.json(created)
    } catch (err) {
      next(err)
    }
  },
  async showLesson(req, res, next) {
    try {
      const { user } = req
      const { idLesson, idCourse } = req.params

      const show = await LessonModel.findOne({
        _id: idLesson,
        course: idCourse,
        user: user._id,
      })

      res.json(show)
    } catch (err) {
      next(err)
    }
  },
}
