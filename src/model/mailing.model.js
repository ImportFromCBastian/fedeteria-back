import transporter from '../settings/transporter.js';

export class MailingModel {
	static async sendChangePasswordEmail(mailBody) {
		const mail = MailingModel.createMailBody(mailBody);
		const mailId = await transporter.sendMail(mail);
		return {
			...mail,
			mailId: mailId.messageId,
		};
	}
	static createMailBody(body) {
		//use body to create mail receiver
		return {
			from: '"Oli Informatic Solutions😺" <lafedeteria@gmail.com>', // sender address
			to: 'sample@gmail.com', // list of receivers
			subject: 'Hello ✔', // Subject line
			text: 'Hello world?', // plain text body
			html: '<b>Hello world?</b>', // html body
		};
	}
}
