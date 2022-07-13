const { isArray } = require('lodash')
const nodemailer = require('nodemailer')

module.exports = {
  configure: async ({ from, to, subject, html }) => {

    let testAccount  = await nodemailer.createTestAccount()
    let transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: testAccount.user, // generated ethereal user
        pass: testAccount.pass, // generated ethereal password
      },
    })

    return {
      send: async (htmlOverride) =>  {
        to = isArray(to)? to.join(', ') : to
        html = htmlOverride ? htmlOverride : html

        let info = await transporter.sendMail({
          from, // '"Fred Foo 👻" <foo@example.com>',
          to,  //'bar@example.com, baz@example.com', // list of receivers
          subject, // 'Hello ✔', // Subject line
          html,
          // text: 'Hello world?', // plain text body
        })

        console.log('Message sent: %s', info.messageId)
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info))
      },
    }
  },
}
