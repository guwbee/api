import dbug from 'debug'
import mustache from 'mustache'
import f from 'fs'
import engines from './engines/index.js'
import lodash from 'lodash'
dbug('express:mail')
const { pick } = lodash
const fs = f.promises

export default class Mail {
  constructor({ to, from, subject, template, data, engine = 'mailgun' }) {
    this.from = from
    this.to = to
    this.subject = subject
    this.template = template
    this.data = data
    this.engine = engine
  }

  async send(overrides) {
    const o = pick(overrides, [
      'to',
      'from',
      'subject',
      'template',
      'data',
      'engine',
    ])

    o.to = o.to ? o.to : this.to
    o.from = o.from ? o.from : this.from
    o.subject = o.subject ? o.subject : this.subject
    o.template = o.template ? o.template : this.template
    o.data = o.data ? o.data : this.data
    o.engine = o.engine ? o.engine : this.engine

    const htmlTpl = await fs.readFile(
      `${__dirname}/templates/html/${o.template}.html`,
      'utf8',
    )
    let html = mustache.render(htmlTpl, o.data)

    const config = {
      to: o.to,
      from: o.from,
      subject: o.subject,
    }
    const engine = await engines(o.engine, config)

    console.log('sending...')
    return await engine.send(html)
  }
}
dbug('loaded')

// Usage
// const Mail = requireApp('mail')
// const mail = new Mail(
//   {
//     to: 'jojoyuji@gmail.com',
//     from: 'info@auri.work',
//     subject: 'meu subject aqui!',
//     template: 'tpl1',
//     data: { message: 'ola' },
//     engine: 'mailgun',
//   },
// )
// mail.send()

module.exports = Mail
