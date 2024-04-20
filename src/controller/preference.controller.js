import { mpc } from '../settings/mercadoPagoConfig.js';
import { PreferenceModel } from '../model/preference.model.js';
import { WebhookModel } from '../model/webhook.model.js';

const client = mpc;

export class PreferenceController {
	static async createPreference(req, res) {
		// const  preferencePrice  = req.price;
		const preference = await PreferenceModel.createPreference(client);

		if (preference) res.status(201).json(preference);
		res.status(400).json({ error: 'Bad Request' });
	}

	static async receiveWebhook(req, res) {
		const query = req.query;
		const result = await WebhookModel.receiveWebhook(query);
		res.json(result);
	}
}
