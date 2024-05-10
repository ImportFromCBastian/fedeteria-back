import { MailingModel } from '../../model/mail/mailing.js'

export class MailingController {
  static async sendRegister(req, res) {
    const mailBody = req.body
    const objectMail = await MailingModel.sendRegister(mailBody)
    //send status code 201 for created mail
    res.status(201).json(objectMail)
  }
}

export default MailingController
