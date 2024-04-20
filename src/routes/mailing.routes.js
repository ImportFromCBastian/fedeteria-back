import { Router } from 'express';
import mailingController from '../controller/mailing.controller.js';

const router = Router();

router.post('/', mailingController);

export default router;
