import transporter from '../settings/transporter.js';

const mailingController = async (req, res) => {
	const mail = createMailBody(req.body);
	const info = await transporter.sendMail(mail);

	console.log('info object: %s', info);
	res.status(200).json({ message: 'check console' });
};

const createMailBody = (body) => {
	return {
		from: '"Oli Informatic Solutions😺" <sebshndz2001@gmail.com>', // sender address
		to: 'valenbulgari13@gmail.com', // list of receivers
		subject: 'Hello ✔', // Subject line
		text: 'Hello world?', // plain text body
		html: '<b>Hello world?</b>', // html body
	};
};

export default mailingController;
