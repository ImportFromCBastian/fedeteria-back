import { ClientModel } from '../../model/Client/client.js'
import clientValidator from '../../model/Client/validator/clientValidator.js'

export class ClientController {
  static async create(req, res) {
    try {
      const client = req.body
      const result = clientValidator(client)

      if (!result.success) {
        return res.status(400).json({ error: JSON.parse(result.error.mesage) })
      }

      await ClientModel.create(user)
      res.status(201).json({ message: 'Cliente creado con éxito' })
    } catch (error) {
      res.status(500).json({ error: error })
    }
  }
}
