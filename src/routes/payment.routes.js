import { Router } from 'express'
import { PaymentController } from '../controller/payment.controller.js'

const router = Router()

router.post('/', PaymentController.createPayment)

router.get('/', PaymentController.getAll)

export default router
