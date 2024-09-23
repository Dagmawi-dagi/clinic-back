const nodemailer = require('nodemailer')
const pug = require('pug')
const { convert } = require('html-to-text')

module.exports = class Email {
  constructor(){}

  transport(){
    return  nodemailer.createTransport({
      service: 'gmail',
      auth:{
        user: process.env.AppGmailAccount,
        pass: process.env.AppGmailAccountPass,
      },
    })
  }


  sendPasswordResetEmail(info){
    const html = pug.renderFile(`${__dirname}/../views/email/passwordReset.pug`,{info})
    return this.transport().sendMail({
      to: info.email,
      form: `clinic <${process.env.AppGmailAccount}>`,
      subject: info.subject,
      html,
      text: convert(html)
    })
  }


}