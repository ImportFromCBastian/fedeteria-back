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
  static async getSuggestionByDNI(req, res) {
    try {
      const { DNI } = req.params
      const suggestions = await ExchangeModel.getSuggestionByDNI(DNI)
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

  static async getSuggestionProductById(req, res) {
    try {
      const { id } = req.params
      const suggestions = await ExchangeModel.getSuggestionProductById(id)
      res.status(200).json(suggestions)
    } catch (error) {
      res.status(500).json({ error: error })
    }
  }

  static async getMainProductById(req, res) {
    try {
      const { id } = req.params
      const suggestions = await ExchangeModel.getMainProductById(id)
      res.status(200).json(suggestions)
    } catch (error) {
      res.status(500).json({ error: error })
    }
  }

  static async createPendingExchange(req, res) {
    try {
      const { id } = req.body
      const result = await ExchangeModel.createPendingExchange(id)
      res.status(200).json(result)
    } catch (error) {
      res.status(500).json({ error: error })
    }
  }

  static async deleteSuggestion(req, res) {
    try {
      const { id } = req.params
      const result = await ExchangeModel.deleteSuggestion(id)
      if (!result.ok) return res.status(404).json({ message: 'No se pudo eliminar la sugerencia' })
      res.status(200).json(result)
    } catch (error) {
      res.status(500).json({ error: error })
    }
  }

  static async getPendingExchange(req, res) {
    try {
      const pending = await ExchangeModel.getPendingExchange()
      res.status(200).json(pending)
    } catch (error) {
      res.status(500).json({ error: error })
    }
  }
  static async getAcceptedExchanges(req, res) {
    try {
      const { DNI } = req.params
      const suggestions = await ExchangeModel.checkExchangeSuggestionAcceptedsByDNI(DNI)
      res.status(200).json(suggestions)
    } catch (error) {
      res.status(500).json({ error: error })
    }
  }
  static async getAvailableTimes(req, res) {
    try {
      const { selectedSucursal, day } = req.params
      const times = await ExchangeModel.getAvailableTimes(selectedSucursal, day)
      res.status(200).json(times)
    } catch (error) {
      res.status(500).json({ error: error })
    }
  }
  static async createExchangeDetailsById(req, res) {
    try {
      const { id } = req.params
      const { codigo, data } = req.body
      const result = await ExchangeModel.createExchangeDetailsById(id, codigo, data)
      res.status(200).json(result)
    } catch (error) {
      res.status(500).json({ error: error })
    }
  }
  static async getTrueques(req, res) {
    try {
      const trueques = await ExchangeModel.getTrueques()
      res.status(200).json(trueques)
    } catch (error) {
      res.status(500).json({ error: error })
    }
  }

  static async updateExchangeStatus(req, res) {
    try {
      const { id } = req.params
      const { realizado } = req.body
      const result = await ExchangeModel.updateExchangeStatus(id, realizado)
      if (!result.ok) return res.status(404).json({ ok: false, message: 'No se pudo actualizar el estado del trueque' })
      res.status(200).json({ ok: true, message: result })
    } catch (error) {
      res.status(500).json({ ok: false, error: error })
    }
  }

  static async getByExchangeCode(req, res) {
    try {
      const { codigo } = req.params
      const [exchange] = await ExchangeModel.getByExchangeCode(codigo)
      if (!exchange) return res.status(404).json({ message: 'No se encontró el trueque' })
      res.status(200).json(exchange)
    } catch (error) {
      res.status(500).json({ error: error })
    }
  }

  static async getProductListStateThree(req, res) {
    try {
      const { id } = req.params
      const suggestions = await ExchangeModel.getProductListStateThree(id)
      res.status(200).json(suggestions)
    } catch (error) {
      res.status(500).json({ error: error })
    }
  }

  static async getClients(req, res) {
    const { id } = req.params
    try {
      const clients = await ExchangeModel.getClients(id)
      res.status(200).json(clients)
    } catch (error) {
      res.status(500).json({ error: error })
    }
  }

  static async getLast20Exchanges(req, res) {
    try {
      const suggestions = await ExchangeModel.getLast20Exchanges()
      res.status(200).json(suggestions)
    } catch (error) {
      res.status(500).json({ error: error })
    }
  }

  static async getExchangeMainProductById(req, res) {
    try {
      const { id } = req.params
      const suggestions = await ExchangeModel.getExchangeMainProductById(id)
      res.status(200).json(suggestions)
    } catch (error) {
      res.status(500).json({ error: error })
    }
  }

  static async getSentSuggestionByDNI(req, res) {
    try {
      const { DNI } = req.params
      const suggestions = await ExchangeModel.getSentSuggestionByDNI(DNI)
      res.status(200).json(suggestions)
    } catch (error) {
      res.status(500).json({ error: error })
    }
  }

  static async getEveryExchangeByDNI(req, res) {
    try {
      const { DNI } = req.params
      const suggestions = await ExchangeModel.getEveryExchangeByDNI(DNI)
      res.status(200).json(suggestions)
    } catch (error) {
      res.status(500).json({ error: error })
    }
  }

  static async getIdExchangeByIdLocal(req, res) {
    try {
      const { idLocal } = req.params
      const suggestions = await ExchangeModel.getIdExchangeByIdLocal(idLocal)
      res.status(200).json(suggestions)
    } catch (error) {
      res.status(500).json({ error: error })
    }
  }

  static async getExchangeProductById(req, res) {
    try {
      const { id } = req.params
      const suggestions = await ExchangeModel.getExchangeProductById(id)
      res.status(200).json(suggestions)
    } catch (error) {
      res.status(500).json({ error: error })
    }
  }

  static async getExchangeInfoById(req, res) {
    try {
      const { id } = req.params
      const suggestions = await ExchangeModel.getExchangeInfoById(id)
      res.status(200).json(suggestions)
    } catch (error) {
      res.status(500).json({ error: error })
    }
  }

  static async isInExchange(req, res) {
    try {
      const { id } = req.params
      const pending = await ExchangeModel.isInExchange(id)
      res.status(200).json(pending)
    } catch (error) {
      res.status(500).json({ error: error })
    }
  }
  static async getCantTrueques(req, res) {
    try {
      const cant = await ExchangeModel.getCantTrueques()
      res.status(200).json(cant)
    } catch (error) {
      res.status(500).json({ error: error })
    }
  }
}
