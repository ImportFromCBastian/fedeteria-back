import { Router } from 'express'
import MailingController from '../../controller/mail/mailing.js'

const router = Router()

router.post('/', MailingController.sendRegister)
router.post('/contrasenia', MailingController.sendRecuperarContrasenia)

router.post('/exchange/contact', MailingController.sendContactInformation)

export default router
