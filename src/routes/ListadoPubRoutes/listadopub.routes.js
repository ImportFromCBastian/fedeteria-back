import { Router } from 'express'
import { PublicacionController } from '../../controller/ListarPublicacionAceptacion/pub-aceptacion.js'

const router = Router()

// Define la ruta para obtener todas las publicaciones
router.get('/', PublicacionController.getAll)

router.delete('/:idPublicacion', PublicacionController.eliminateById)

router.put('/:idPublicacion', PublicacionController.acceptById)

router.patch('/:idPublicacion', PublicacionController.eliminateById)

router.get('/notDeleted/', PublicacionController.getAllNotDeleted)

export default router
