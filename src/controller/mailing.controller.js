import { MailingModel } from '../model/mailing.model.js';

export class MailingController {
	static async sendChangePasswordEmail(req, res) {
		const { mailBody } = req.body;
		const objectMail = await MailingModel.sendChangePasswordEmail(mailBody);
		//send status code 201 for created mail
		res.status(201).json(objectMail);
	}
}

export default MailingController;
