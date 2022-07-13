const nodemailer = require('nodemailer')
const mg = require('nodemailer-mailgun-transport')

const auth = {
  auth: {
    'api_key': process.env.MAILGUN_API_KEY,
    'domain': process.env.MAILGUN_DOMAIN,
  },
  // proxy: 'http://user:pass@localhost:8080' // optional proxy, default is false
}
module.exports = {
  configure: ({ from, to, subject }) => {
    const nodemailerMailgun = nodemailer.createTransport(mg(auth))

    return {
      send: async (html) =>  {

        await nodemailerMailgun.sendMail({
          from,
          to,
          subject,
          html,
          // text: 'Hello, World',
        }).catch(e => {
          console.log('MailGun error')
          console.log(e)
        })
      },
    }
  },
}
