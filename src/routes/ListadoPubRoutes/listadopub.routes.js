import { Router } from 'express'
import { PublicacionController } from '../../controller/ListarPublicacionAceptacion/pub-aceptacion.js'

const router = Router()

// Define la ruta para obtener todas las publicaciones
router.get('/', PublicacionController.getAll)

export default router
