//TODO: refactorizar el codigo para que sea mas limpio y entendible

import { mpc } from '../settings/mercadoPagoConfig.js';
import { Preference } from 'mercadopago';
import config from '../settings/settings.js';

const client = mpc;
const preference = new Preference(client);
const preferences = {
	body: {
		payment_methods: {
			excluded_payment_methods: [
				{
					id: 'argencard',
				},
				{
					id: 'cabal',
				},
				{
					id: 'cmr',
				},
				{
					id: 'cencosud',
				},
				{
					id: 'cordobesa',
				},
				{
					id: 'diners',
				},
				{
					id: 'naranja',
				},
				{
					id: 'tarshop',
				},
				{
					id: 'debcabal',
				},
				{
					id: 'maestro',
				},
			],
			excluded_payment_types: [
				{
					id: 'ticket',
				},
			],
			installments: 1,
		},
		//front implementation of item
		items: [
			{
				title: 'Promocionar Publicacion',
				quantity: 1,
				unit_price: 2500,
			},
		],
		back_urls: {
			success: 'http://localhost:3000/success',
			failure: 'http://localhost:3000/failure',
			pending: 'http://localhost:3000/pending',
		},
		notification_url: `${config.SECURE_ROUTE}/webhook`,
	},
};
export const createPreference = (req, res) => {
	preference
		.create(preferences)
		.then((response) => res.json(response.id))
		.catch(console.log);
};

export const receiveWebhook = async (req, res) => {
	const query = req.query;
	try {
		if (query.id) {
			const paymentData = await preference.get({ preferenceId: query.id });
			console.log(paymentData);
			//store in db
		}
		res.sendStatus(204);
	} catch (error) {
		return res.sendStatus(500).json({ error: error.message });
	}
};
