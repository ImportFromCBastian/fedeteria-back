import { SucursalModel } from '../../model/Sucursal/sucursal.js'
import sucursalValidator from '../../model/Sucursal/schema/sucursalSchema.js'

export class SucursalController {
  static async create(req, res) {
    try {
      const sucursal = req.body
      const result = sucursalValidator(sucursal)
      if (!result.success) {
        return res.status(400).json(JSON.parse(JSON.stringify(result.error.issues, null, 2)))
      }
      res.status(201).json({ message: error, ok: true })
    } catch (error) {
      res.status(500).json({ error: error })
    }
  }
}
