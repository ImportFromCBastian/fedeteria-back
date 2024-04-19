import { Router } from 'express';
import mailingController from '../controller/mailing.controller.js';

const router = Router();

router.get('/', mailingController);

export default router;
