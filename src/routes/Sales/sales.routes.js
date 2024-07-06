import { Router } from 'express'
import { SaleController } from '../../controller/Sales/sale.js'

const router = Router()

router.post('/', SaleController.create)

export default router
