import { Router } from 'express'
import { SucursalController } from '../../controller/Sucursal/sucursal.js'

const router = Router()

router.post('/', SucursalController.create)

router.get('/', SucursalController.getAll)

router.delete('/:id', SucursalController.delete)

router.get('/ventas', SucursalController.getVentasPorSucursal)

router.get('/ganancias', SucursalController.getGananciasPorSucursal)

router.get('/get/:id', SucursalController.getSucursalById)

export default router
