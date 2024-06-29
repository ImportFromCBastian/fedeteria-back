import { saleValidator } from '../../model/Sales/schema/saleValidator.js'
import { SaleModel } from '../../model/Sales/sale.js'

export class SaleController {
  static async create(req, res) {
    const { paymentData } = req.body
    const { error, data, success } = saleValidator(paymentData)
    if (!success) {
      return res.status(400).json({ ok: false, error })
    }
    const { pago, dniCliente, dniEmpleado, precio } = data
    const result = await SaleModel.create(pago, dniCliente, dniEmpleado, precio)
    if (!result) return res.status(400).json({ ok: false, error: 'El dni del cliente no existe/ mal escrito' })
    res.status(201).json({ result })
    // agregar a la tabla venta y producto (hablar)
  }
}
