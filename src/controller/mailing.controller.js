import { Resend } from 'resend';

import config from '../settings/settings.js';

const resend = new Resend(`${config.RESEND_KEY}`);

const mailingController = async (req, res) => {
	try {
		const email = await resend.emails.send({
			from: 'onboarding@resend.dev',
			to: 'myemail@gmail.com',
			subject: 'Hello World',
			html: '<p>Congrats on sending your <strong>first email</strong>!</p>',
		});
		//capaz conviene guardar el id de la transaccion en la base de datos
		console.log(email);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};
export default mailingController;
