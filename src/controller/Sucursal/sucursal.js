import { SucursalModel } from '../../model/Sucursal/sucursal.js'
import sucursalValidator from '../../model/Sucursal/schema/sucursalSchema.js'

export class SucursalController {
  static async getAll(req, res) {
    try {
      const sucursales = await SucursalModel.getAll()
      return res.status(200).json({ data: sucursales })
    } catch (error) {
      return res.status(500).json({ error: error })
    }
  }

  static async create(req, res) {
    try {
      const sucursal = req.body
      const result = sucursalValidator(sucursal)
      if (!result.success) {
        return res.status(400).json({ error: result.error })
      }
      await SucursalModel.create(sucursal)
      res.status(201).json({ ok: true })
    } catch (error) {
      res.status(500).json({ error: error })
    }
  }
  static async delete(req, res) {
    try {
      const id = req.params.id
      await SucursalModel.delete(id)
      res.status(200).json({ ok: true })
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }
  static async getVentasPorSucursal(req, res) {
    try {
      const ventas = await SucursalModel.getVentasPorSucursal()
      res.status(200).json(ventas)
    } catch (error) {
      res.status(500).json({ error: error })
    }
  }
  static async getGananciasPorSucursal(req, res) {
    try {
      const ganancias = await SucursalModel.getGananciasPorSucursal()
      res.status(200).json(ganancias)
    } catch (error) {
      res.status(500).json({ error: error })
    }
  }
}
