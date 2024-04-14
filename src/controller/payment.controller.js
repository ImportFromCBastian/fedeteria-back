import { Payment } from 'mercadopago';
import { mpc } from '../settings/mercadoPagoConfig.js';

const client = mpc;

export const processPayment = async (req, res) => {
	const payment = new Payment(client);

	console.log('req: ', req);

	payment
		.create({
			body: {
				transaction_amount: 100,
				description: '<DESCRIPTION>',
				payment_method_id: '<PAYMENT_METHOD_ID>',
				payer: {
					email: '<EMAIL>',
				},
			},
		})
		.then(console.log)
		.catch(console.log);
	res.send('Payment processed');
};
