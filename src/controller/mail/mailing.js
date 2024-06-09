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
  static async sendRecuperarContrasenia(req, res) {
    try {
      // Obtén el cuerpo de la solicitud que incluye el correo electrónico y el nombre de usuario
      const { email, nombre } = req.body
      // Envía el correo electrónico de recuperación con el nombre de usuario
      const objectMail = await MailingModel.sendRecuperarContrasenia({ email, nombre })

      // Envía una respuesta con el objeto del correo electrónico enviado
      res.status(201).json(objectMail)
    } catch (error) {
      // Maneja los errores
      console.error('Error al enviar el correo de recuperación:', error)
      res.status(500).json({ message: 'Error al enviar el correo de recuperación' })
    }
  }

  static async sendBloqueoCuenta(req, res) {
    try {
      // Obtén el cuerpo de la solicitud que incluye el correo electrónico y el nombre de usuario
      const { email, nombre } = req.body
      // Envía el correo electrónico de recuperación con el nombre de usuario
      const objectMail = await MailingModel.sendBloqueoCuenta({ email, nombre })

      // Envía una respuesta con el objeto del correo electrónico enviado
      res.status(201).json(objectMail)
    } catch (error) {
      // Maneja los errores
      console.error('Error al enviar el correo de bloqueo:', error)
      res.status(500).json({ message: 'Error al enviar el correo de bloqueo' })
    }
  }

  static async sendContactInformation(req, res) {
    const { owner, suggestor } = req.body
    const objectMail = await MailingModel.sendContactInformation(owner, suggestor)
    return res.status(201).json({ ok: true, objectMail })
  }
}

export default MailingController
