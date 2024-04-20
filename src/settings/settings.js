import 'dotenv/config';
const config = {
	MP_KEY: process.env.MP_ACCESS_TOKEN,
	PORT: process.env.PORT,
	SECURE_ROUTE: process.env.SECURE_ROUTE,
	SMTP_OPTIONS: {
		host: process.env.SMTP_SERVER,
		port: parseInt(process.env.SMTP_PORT),
		user: process.env.SMTP_USER,
		pass: process.env.SMTP_PASS,
	},
};
export default config;
