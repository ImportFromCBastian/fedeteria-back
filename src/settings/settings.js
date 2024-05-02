import 'dotenv/config'
const config = {
  BASE_URL: process.env.BASE_URL,
  MP_KEY: process.env.MP_ACCESS_TOKEN,
  PORT: process.env.PORT,
  SECURE_ROUTE: process.env.SECURE_ROUTE,
  SMTP_OPTIONS: {
    host: process.env.SMTP_SERVER,
    port: parseInt(process.env.SMTP_PORT),
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
  DB_OPTIONS: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: 'fedeteria-db',
    port: parseInt(process.env.DB_PORT),
  },
}
export default config
