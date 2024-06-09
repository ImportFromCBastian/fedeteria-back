import transporter from '../../settings/transporter.js'
import { readFile } from 'fs/promises'

export class MailingModel {
  static async sendRegister(mailBody) {
    try {
      // Validate correct mail body
      // Create mail body
      const mail = await MailingModel.createRegisterMailBody(mailBody)
      // Send mail
      const mailId = await transporter.sendMail(mail)
      return { mailId: mailId.messageId }
    } catch (error) {
      console.error('Error sending registration mail:', error)
      throw error
    }
  }

  static async createRegisterMailBody(body) {
    try {
      // Use body to create mail receiver and gather the HTML for the mail
      const htmlTemplate = await readFile('src/public/template/mail.html', 'utf-8')
      // Read image to attach
      const cidImage = await readFile('src/public/assets/Fedeteria_Horizontal.png')

      return {
        from: '"Fedeteria🔨" <lafedeteria@gmail.com>', // Sender address
        to: body.email, // List of receivers
        subject: 'Registro en Fedeteria exitoso✅', // Subject line
        html: htmlTemplate,
        attachments: [
          {
            filename: 'Fedeteria_Horizontal.png',
            content: cidImage.toString('base64'),
            encoding: 'base64',
            cid: 'uniqueImageCID' // Referenced in the HTML template
          }
        ]
      }
    } catch (error) {
      console.error('Error creating registration mail body:', error)
      throw error
    }
  }

  static async sendRecuperarContrasenia(mailBody) {
    try {
      // Validate correct mail body
      // Create mail body
      const mail = await MailingModel.createRecuperarContraseniaMailBody(mailBody)
      // Send mail
      const mailId = await transporter.sendMail(mail)
      return { mailId: mailId.messageId }
    } catch (error) {
      console.error('Error sending password recovery mail:', error)
      throw error
    }
  }

  static async createRecuperarContraseniaMailBody(body) {
    try {
      // Use body to create mail receiver and gather the HTML for the mail
      const htmlTemplate = await readFile('src/public/template/mailRecuperacion.html', 'utf-8')
      // Read image to attach
      const cidImage = await readFile('src/public/assets/Fedeteria_Horizontal.png')
      const emailBodyWithUsername = htmlTemplate.replace(/{username}/g, body.nombre)

      return {
        from: '"Fedeteria🔨" <lafedeteria@gmail.com>', // Sender address
        to: body.email, // List of receivers
        subject: 'Recuperá tu contraseña', // Subject line
        html: emailBodyWithUsername,
        attachments: [
          {
            filename: 'Fedeteria_Horizontal.png',
            content: cidImage.toString('base64'),
            encoding: 'base64',
            cid: 'uniqueImageCID' // Referenced in the HTML template
          }
        ]
      }
    } catch (error) {
      console.error('Error creating password recovery mail body:', error)
      throw error
    }
  }

  static async sendBloqueoCuenta(mailBody) {
    try {
      // Validate correct mail body
      // Create mail body
      const mail = await MailingModel.createBloqueoMailBody(mailBody)
      // Send mail
      const mailId = await transporter.sendMail(mail)
      return { mailId: mailId.messageId }
    } catch (error) {
      console.error('Error sending account block mail:', error)
      throw error
    }
  }

  static async createBloqueoMailBody(body) {
    try {
      // Use body to create mail receiver and gather the HTML for the mail
      const htmlTemplate = await readFile('src/public/template/mailBloqueo.html', 'utf-8')
      // Read image to attach
      const cidImage = await readFile('src/public/assets/Fedeteria_Horizontal.png')
      const emailBodyWithUsername = htmlTemplate.replace(/{username}/g, body.nombre)

      return {
        from: '"Fedeteria🔨" <lafedeteria@gmail.com>', // Sender address
        to: body.email, // List of receivers
        subject: 'Tu cuenta está bloqueada 😔.', // Subject line
        html: emailBodyWithUsername,
        attachments: [
          {
            filename: 'Fedeteria_Horizontal.png',
            content: cidImage.toString('base64'),
            encoding: 'base64',
            cid: 'uniqueImageCID' // Referenced in the HTML template
          }
        ]
      }
    } catch (error) {
      console.error('Error creating account block mail body:', error)
      throw error
    }
  }

  static async sendContactInformation(ownerMail, suggestorMail) {
    try {
      const ownerMailBody = await MailingModel.createContactInformationMailBody(ownerMail, suggestorMail, 'owner')
      const suggestorMailBody = await MailingModel.createContactInformationMailBody(suggestorMail, ownerMail, 'suggestor')
      const ownerMailId = await transporter.sendMail(ownerMailBody)
      const suggestorMailId = await transporter.sendMail(suggestorMailBody)
      return {
        ownerMailId: ownerMailId.messageId,
        suggestorMailId: suggestorMailId.messageId
      }
    } catch (error) {
      console.error('Error sending contact information mail:', error)
      throw error
    }
  }

  static async createContactInformationMailBody(to, mailMessage, type) {
    try {
      if (type === 'suggestor') {
        return {
          from: '"Fedeteria🔨" <lafedeteria@gmail.com>', // Sender address
          to: to, // List of receivers
          subject: 'FedeTrueque Aceptado Contactate con tu FedeAmigo📨', // Subject line
          html: `
            <h1>¡Hola!👋</h1>
            <p>¡Tu sugerencia de trueque ha sido aceptada!🎉 Contacta con ${mailMessage} para determinar la hora y lugar del trueque.</p>
          `
        }
      }

      return {
        from: '"Fedeteria🔨" <lafedeteria@gmail.com>', // Sender address
        to: to, // List of receivers
        subject: 'FedeTrueque Aceptado Contactate con tu FedeAmigo📨', // Subject line
        html: `
          <h1>¡Hola!👋</h1>
          <p>¡Aceptaste un trueque recientemente!🎉 Contacta con ${mailMessage} para determinar la hora y lugar del trueque.</p>
        `
      }
    } catch (error) {
      console.error('Error creating contact information mail body:', error)
      throw error
    }
  }
}
