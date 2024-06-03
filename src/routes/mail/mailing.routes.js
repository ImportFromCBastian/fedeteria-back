import { Router } from 'express'
import MailingController from '../../controller/mail/mailing.js'

const router = Router()

router.post('/', MailingController.sendRegister)
router.post('/contrasenia', MailingController.sendRecuperarContrasenia)
router.post('/bloqueo', MailingController.sendBloqueoCuenta)

export default router
