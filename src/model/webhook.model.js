//improve data receivemnent
export class WebhookModel {
	static async receiveWebhook() {
		const query = req.query;
		try {
			if (query.id) {
				const paymentData = await preference.get({ preferenceId: query.id });
				console.log(paymentData);
				//store in db
			}
			return paymentData;
		} catch (error) {
			return { error: error.message };
		}
	}
}
