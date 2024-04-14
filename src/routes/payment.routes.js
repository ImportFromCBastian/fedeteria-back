import { Router } from 'express';
import { processPayment } from '../controller/payment.controller.js';

const router = Router();

router.post('/process_payment', processPayment);

export default router;
