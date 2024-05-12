import { Router } from 'express'
import { PerfilController } from '../../controller/VerPerfil/perfil.js'

const router = Router()

// Define la ruta para obtener todas las publicaciones
router.get('/mi-perfil/:idPerfil', PerfilController.getMiPerfil)

export default router
