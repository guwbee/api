import querystring from 'querystring'
import axios from 'axios'

export default class GoogleOAuth {
  constructor(googleClientId, googleClientSecret, { rootURI, redirectURI }) {
    this.googleClientId = googleClientId
    this.googleClientSecret = googleClientSecret

    this.rootURI = rootURI
    this.redirectURI = redirectURI
  }
  get googleAuthURL() {
    return this.getGoogleAuthURL()
  }

  getGoogleAuthURL() {
    const rootUrl = 'https://accounts.google.com/o/oauth2/v2/auth'
    const options = {
      redirect_uri: `${this.rootURI}/${this.redirectURI}`,
      client_id: this.googleClientId,
      access_type: 'offline',
      response_type: 'code',
      prompt: 'consent',
      scope: [
        'https://www.googleapis.com/auth/userinfo.profile',
        'https://www.googleapis.com/auth/userinfo.email',
      ].join(' '),
    }

    return `${rootUrl}?${querystring.stringify(options)}`
  }

  async getTokens(code) {
    /*
     * Uses the code to get tokens
     * that can be used to fetch the user's profile
     */
    const url = 'https://oauth2.googleapis.com/token'
    const values = {
      code,
      client_id: this.googleClientId,
      client_secret: this.googleClientSecret,
      redirect_uri: this.rootURI + '/' + this.redirectURI,
      grant_type: 'authorization_code',
    }

    return axios
      .post(url, querystring.stringify(values), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      })
      .then((res) => res.data)
      .catch((error) => {
        console.error('failed to fetch auth tokens')
        throw new Error(error.message)
      })
  }

  async getGoogleUser(id_token, access_token) {
    return await axios
      .get(
        `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${access_token}`,
        {
          headers: {
            Authorization: `Bearer ${id_token}`,
          },
        },
      )
      .then((res) => res.data)
      .catch((error) => {
        console.error('Failed to fetch user')
        throw new Error(error.message)
      })
  }
}

// USAGE: Getting login URL
// app.get('/auth/google/url', (req, res) => {
//   return res.send(getGoogleAuthURL())
// })
