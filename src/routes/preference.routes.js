import { Router } from 'express';
import {
	createPreference,
	receiveWebhook,
} from '../controller/preference.controller.js';

const router = Router();

router.post('/create_preference', createPreference);

router.get('/success', (req, res) => res.send('success'));

router.get('/failure', (req, res) => res.send('failure'));

router.get('/pending', (req, res) => res.send('pending'));

router.post('/webhook', receiveWebhook);

export default router;
