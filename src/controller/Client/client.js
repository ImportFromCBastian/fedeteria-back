import { ClientModel } from '../../model/Client/client.js'

export class ClientController {
  static async create(req, res) {
    try {
      const user = req.body
      const result = await ClientModel.create(user)
      res.status(201).json(result)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }
}
