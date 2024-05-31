import { Router } from 'express'
import { SucursalController } from '../../controller/Sucursal/sucursal.js'

const router = Router()

router.post('/', SucursalController.create)

router.get('/', SucursalController.getAll)

router.delete('/:id', SucursalController.delete)

export default router
