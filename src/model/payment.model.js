import { Payment } from 'mercadopago';
//TODO: change description,payment method and payer from paymentBody argument
export class PaymentModel {
	static async createPayment(client, paymentBody) {
		const payment = new Payment(client);

		const result = await payment
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
			.catch(console.log);
		//maybe save transaction in DB...
		return result;
	}
}
