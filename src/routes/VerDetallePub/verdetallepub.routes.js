import { Router } from 'express'
import { DetalleController } from '../../controller/VerDetallePub/detalles.js'
const router = Router()

// Define la ruta para obtener todas las publicaciones
router.get('/:idPublicacion', DetalleController.getPub)

router.delete('/:idPublicacion', DetalleController.eliminateById)

router.put('/:idPublicacion', DetalleController.acceptById)

export default router
