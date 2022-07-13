import GoogleOAuth from '../config/oauth/google'
import jwt from 'jsonwebtoken'
import userToJwt from '../utils/userToJwt.js'
import UserModel from '../models/user.model.js'

const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, API_URL } = process.env

const oauth = new GoogleOAuth(GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, {
  rootURI: API_URL,
  redirectURI: 'auth/google',
})

import dbug from 'utils/debug'
dbug('routes:auth:google:redirect.js')

// app.get(`/${redirectURI}`,
// const { redirectURI}

export default {
  async redirect(req, res) {
    try {
      const code = req.query.code
      const state = req.query.state ? JSON.parse(req.query.state) : {}
      console.log('state')
      console.log(state)

      const { id_token, access_token } = await oauth.getTokens(code)
      // Fetch the user's profile with the access token and bearer
      const googleUser = await oauth.getGoogleUser(id_token, access_token)

      let socialUser = await UserModel.findOne({
        $or: [
          { 'google.id': googleUser.id },
          { 'google.email': googleUser.email },
        ],
      })
      let mainUser
      if (!socialUser) {
        mainUser = await UserModel.findOne({
          email: googleUser.email,
        })
        if (mainUser) {
          return res.redirect(
            `${process.env.FRONT_URL}/login?error='Noope'${
              state.redir ? '&redir=' + encodeURIComponent(state.redir) : ''
            }`,
          )
        }
        mainUser = await UserModel.create({
          email: googleUser.email,
          name: googleUser.name,
          google: googleUser,
        })
        console.log('created', socialUser)
        // if(!mainUser.confirmed) {
        //   // res.redirect(`${process.env.FRONT_URL}/login?error='google|'`)
        //   mainUser.email = googleUser.email
        //   mainUser.password = undefined
        //   console.log('here')
        //   mainUser = await mainUser.save()
        // }
      }

      const token = jwt.sign(
        userToJwt(mainUser || socialUser),
        process.env.SECRET,
      )

      const urlRedir = `${process.env.FRONT_URL}/login?oauth=${token}${
        state.redir ? '&redir=' + encodeURIComponent(state.redir) : ''
      }`
      console.log(urlRedir)
      // res.redirect(`${process.env.FRONT_URL}/login?oauth=${token}`)
      return res.redirect(urlRedir)
    } catch (e) {
      dbug(e)
      dbug(e.message)
      const url = oauth.getGoogleAuthURL()
      res.redirect(url)
    }
  },

  async url(_req, res, next) {
    try {
      const url = oauth.getGoogleAuthURL()
      res.send(url)
    } catch (err) {
      next(err)
    }
  },
}
dbug('loaded')
