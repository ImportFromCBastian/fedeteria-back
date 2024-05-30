import { ExchangeModel } from '../../model/Exchange/exchange.js'
import { exchangeBodyValidator } from '../../model/Exchange/Schema/exchangeSchema.js'
export class ExchangeController {
  static async getExchangeSuggestionByDNI(req, res) {
    try {
      const { DNI } = req.params
      const suggestions = await ExchangeModel.checkExchangeSuggestionByDNI(DNI)
      res.status(200).json(suggestions)
    } catch (error) {
      res.status(500).json({ error: error })
    }
  }
  static async create(req, res) {
    try {
      const { mainPublication, publicationList } = req.body
      const exchange = exchangeBodyValidator({ mainPublication, publicationList })
      if (!exchange.success) return res.status(400).json({ error: exchange.error })

      const exchangeId = await ExchangeModel.create(mainPublication)
      await ExchangeController.createList(exchangeId, publicationList)

      res.status(201).json({ ok: true })
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }

  static async createList(exchangeId, publicationList) {
    const valid = await ExchangeModel.findById(exchangeId)
    if (valid.length === 0) throw new Error('Exchange not found')
    publicationList.forEach(async publicationId => {
      await ExchangeModel.createList(exchangeId, publicationId)
    })
  }
}
