import { mpc } from '../settings/mercadoPagoConfig.js'
import { PreferenceModel } from '../model/preference.model.js'
import { WebhookModel } from '../model/webhook.model.js'

const client = mpc

export class PreferenceController {
  static async createPreference(req, res) {
    const { amount } = req.body
    const preference = await PreferenceModel.createPreference(client, parseInt(amount))
    if (preference) return res.status(201).json(preference)
    res.status(400).json({ error: 'Bad Request' })
  }

  static async receiveWebhook(req, res) {
    const query = req.query
    const result = await WebhookModel.receiveWebhook(query)
    res.json(result)
  }

  static async success(req, res) {
    res.json({ message: 'success' })
  }
}
