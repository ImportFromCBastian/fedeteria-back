import { Router } from 'express';
import MailingController from '../controller/mailing.controller.js';

const router = Router();

router.post('/', MailingController.sendChangePasswordEmail);

export default router;
