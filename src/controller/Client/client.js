import { ClientModel } from '../../model/Client/client.js'
import { clientValidator } from '../../model/Client/validator/clientValidator.js'

export class ClientController {
  static async create(req, res) {
    try {
      const frontUser = req.body
      const [user, errors] = clientValidator(frontUser)
      let warning = 0
      for (const error in errors) {
        warning++
      }
      if (warning) res.status(400).json(errors)

      //await ClientModel.create(user)
      // res.status(201).json(result)
    } catch (error) {
      res.status(500).json({ error: error })
    }
  }
}
