import nodemailer from './nodemailer.js'
import mailgun from './mailgun.js'

export default async (engine, config) => {
  switch (engine) {
  case 'nodemailer':
    return await nodemailer.configure(config)
  default: // uses mailgun as a default engine
    return await mailgun.configure(config)
  }
}
