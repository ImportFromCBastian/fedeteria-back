import { Router } from 'express'
import { SucursalController } from '../../controller/Sucursal/sucursal.js'

const router = Router()

router.post('/', SucursalController.create)

export default router
