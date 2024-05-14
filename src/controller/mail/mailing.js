import { MailingModel } from '../../model/mail/mailing.js'
import { mailBodyValidator } from '../../model/mail/schema/mailSchema.js'

export class MailingController {
  static async sendRegister(req, res) {
    const mailBody = req.body
    //validate the mail
    const result = mailBodyValidator(mailBody)

    if (!result.success) {
      return res.status(400).json({ message: result.error })
    }
    const objectMail = await MailingModel.sendRegister(mailBody)
    //send status code 201 for created mail
    res.status(201).json(objectMail)
  }
}
export default MailingController
