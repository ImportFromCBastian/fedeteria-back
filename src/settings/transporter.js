import nodemailer from 'nodemailer';
import config from './settings.js';

const transporter = nodemailer.createTransport({
	host: `${config.SMTP_OPTIONS['host']}`,
	port: config.SMTP_OPTIONS['port'],
	secure: false, // Use `true` for port 465, `false` for all other ports
	auth: {
		user: `${config.SMTP_OPTIONS['user']}`,
		pass: `${config.SMTP_OPTIONS['pass']}`,
	},
});

export default transporter;
