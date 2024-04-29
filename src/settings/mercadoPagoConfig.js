import { MercadoPagoConfig } from 'mercadopago'
import config from './settings.js'
import 'dotenv/config'

export const mpc = new MercadoPagoConfig({
  accessToken: `${config.MP_KEY}`,
})
