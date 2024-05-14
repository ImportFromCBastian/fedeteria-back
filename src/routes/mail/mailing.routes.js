import { Router } from 'express'
import MailingController from '../../controller/mail/mailing.js'

const router = Router()

router.post('/', MailingController.sendRegister)

export default router
