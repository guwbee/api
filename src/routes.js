import express from 'express'
import passport from './config/passport/index.js'

import authCtrl from './ctrl/auth.ctrl.js'
import userCtrl from './ctrl/user.ctrl.js'
import meCtrl from './ctrl/me.ctrl.js'

// const passCtrl = requireApp('ctrl/password.ctrl')
// const courseCtrl = requireApp('ctrl/course.ctrl')
// const lessonCtrl = requireApp('ctrl/lesson.ctrl')
// const googleOAuthCtrl = requireApp('ctrl/oauth/google')

const router = express.Router()
router.post('/signup', userCtrl.createUser)
router.post('/auth', authCtrl.createAuth)
//
// router.get('/auth/google/url', googleOAuthCtrl.url)
// router.get('/auth/google', googleOAuthCtrl.redirect)

// router.post('/password', passCtrl.resetPassword)

// protected from here
router.use(passport.authenticate('jwt', { session: false }))

// me
router.get('/me', meCtrl.index)
router.post('/me', meCtrl.create)

// logout
router.delete('/auth', authCtrl.deleteAuth)

// courses
// router.get('/courses', courseCtrl.indexCourse)
// router.post('/courses', courseCtrl.createCourse)

// lessons
// router.get('/courses/:idCourse/lessons', lessonCtrl.indexLesson)
// router.post('/courses/:idCourse/lessons', lessonCtrl.createLesson)
// router.get('/courses/:idCourse/lessons/:idLesson', lessonCtrl.showLesson)

router.use(function (err, _req, res, next) {
  if (err.name === 'ValidationError') {
    return res.status(422).json({
      errors: Object.keys(err.errors).reduce(function (errors, key) {
        errors[key] = err.errors[key].message

        return errors
      }, {}),
    })
  }

  return next(err)
})

// module.exports = router
export default router
