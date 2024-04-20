import { Router } from 'express';
import { PaymentController } from '../controller/payment.controller.js';

const router = Router();

router.post('/process_payment', PaymentController.createPayment);

export default router;
