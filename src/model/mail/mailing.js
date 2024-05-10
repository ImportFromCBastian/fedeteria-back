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
      mailId: mailId.messageId,
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
          cid: 'uniqueImageCID', // Referenced in the HTML template
        },
      ],
    }
  }
}
