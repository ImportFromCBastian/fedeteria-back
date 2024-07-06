import { ProductModel } from '../../model/Product/product.js'
import { productValidator } from '../../model/Product/schema/productValidator.js'

export class ProductController {
  static async getAll(req, res) {
    try {
      const products = await ProductModel.getAll()
      res.status(200).json(products)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }

  static async create(req, res) {
    const object = req.body
    const { success, data, error } = productValidator(object)
    if (success === false) {
      return res.status(400).json({ error })
    }
    try {
      await ProductModel.create(data.nombre, data.precio)
      res.status(201).json({
        ok: true,
        message: 'Producto creado'
      })
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }
}
