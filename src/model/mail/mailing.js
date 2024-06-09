import e from 'cors'
import transporter from '../../settings/transporter.js'
import { readFile } from 'fs/promises'

export class MailingModel {
  static async sendRegister(mailBody) {
    //validate correct mail body
    //create mail body
    const mail = await MailingModel.createRegisterMailBody(mailBody)
    //send mail
    const mailId = await transporter.sendMail(mail)
    return {
      mailId: mailId.messageId
    }
  }
  static async createRegisterMailBody(body) {
    //use body to create mail receiver and gather the html for the mail
    const htmlTemplate = await readFile('src/public/template/mail.html', 'utf-8')
    //read image to attach
    const cidImage = await readFile('src/public/assets/Fedeteria_Horizontal.png')

    return {
      from: '"Fedeteria🔨" <lafedeteria@gmail.com>', // sender address
      to: `${body.email}`, // list of receivers
      subject: 'Registro en Fedeteria exitoso✅', // Subject line
      html: htmlTemplate,
      attachments: [
        {
          filename: 'Fedeteria_Horizontal.png',
          content: cidImage,
          encoding: 'base64',
          cid: 'uniqueImageCID' // Referenced in the HTML template
        }
      ]
    }
  }
  static async sendRecuperarContrasenia(mailBody) {
    //validate correct mail body
    //create mail body
    const mail = await MailingModel.createRecuperarContraseniaMailBody(mailBody)
    //send mail
    const mailId = await transporter.sendMail(mail)
    return {
      mailId: mailId.messageId
    }
  }
  static async createRecuperarContraseniaMailBody(body) {
    //use body to create mail receiver and gather the html for the mail
    const htmlTemplate = await readFile('src/public/template/mailRecuperacion.html', 'utf-8')
    //read image to attach
    const cidImage = await readFile('src/public/assets/Fedeteria_Horizontal.png')
    const emailBodyWithUsername = htmlTemplate.replace(/{username}/g, body.nombre)
    return {
      from: '"Fedeteria🔨" <lafedeteria@gmail.com>', // sender address
      to: `${body.email}`, // list of receivers
      subject: 'Recuperá tu contraseña', // Subject line
      html: emailBodyWithUsername,
      attachments: [
        {
          filename: 'Fedeteria_Horizontal.png',
          content: cidImage,
          encoding: 'base64',
          cid: 'uniqueImageCID' // Referenced in the HTML template
        }
      ]
    }
  }

  static async sendBloqueoCuenta(mailBody) {
    //validate correct mail body
    //create mail body
    const mail = await MailingModel.createBloqueoMailBody(mailBody)
    //send mail
    const mailId = await transporter.sendMail(mail)
    return {
      mailId: mailId.messageId
    }
  }
  static async createBloqueoMailBody(body) {
    //use body to create mail receiver and gather the html for the mail
    const htmlTemplate = await readFile('src/public/template/mailBloqueo.html', 'utf-8')
    //read image to attach
    const cidImage = await readFile('src/public/assets/Fedeteria_Horizontal.png')
    const emailBodyWithUsername = htmlTemplate.replace(/{username}/g, body.nombre)
    return {
      from: '"Fedeteria🔨" <lafedeteria@gmail.com>', // sender address
      to: `${body.email}`, // list of receivers
      subject: 'Tu cuenta está bloqueada 😔.', // Subject line
      html: emailBodyWithUsername,
      attachments: [
        {
          filename: 'Fedeteria_Horizontal.png',
          content: cidImage,
          encoding: 'base64',
          cid: 'uniqueImageCID' // Referenced in the HTML template
        }
      ]

  static async sendContactInformation(ownerMail, suggestorMail) {
    const ownerMailBody = await MailingModel.createContactInformationMailBody(ownerMail, suggestorMail, 'owner')
    const suggestorMailBody = await MailingModel.createContactInformationMailBody(suggestorMail, ownerMail, 'suggestor')
    const ownerMailId = await transporter.sendMail(ownerMailBody)
    const suggestorMailId = await transporter.sendMail(suggestorMailBody)
    return {
      ownerMailId: ownerMailId.messageId,
      suggestorMailId: suggestorMailId.messageId
    }
  }

  static async createContactInformationMailBody(to, mailMessage, type) {
    if (type === 'suggestor') {
      return {
        from: '"Fedeteria🔨" <lafedeteria@gmail.com>', // sender address
        to: `${to}`, // list of receivers
        subject: 'FedeTrueque Aceptado Contactate con tu FedeAmigo📨', // Subject line
        html: `
        <h1>¡Hola!👋</h1>
        <p>¡Tu sugerencia de trueque ha sido aceptado!🎉, contactate con ${mailMessage} para determinar la hora y lugar del trueque</p>
        
        `
      }
    }
    return {
      from: '"Fedeteria🔨" <lafedeteria@gmail.com>', // sender address
      to: `${to}`, // list of receivers
      subject: 'FedeTrueque Aceptado Contactate con tu FedeAmigo📨', // Subject line
      html: `
          <h1>¡Hola!👋</h1>
          <p>¡Aceptaste un trueque recientemente!🎉, contactate con ${mailMessage} para determinar la hora y lugar del trueque</p>
          `
    }
  }
}
