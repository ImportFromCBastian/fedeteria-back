import { Router } from 'express'
import { ProductController } from '../../controller/Product/product.js'

const router = Router()

router.get('/', ProductController.getAll)

router.post('/', ProductController.create)

export default router
