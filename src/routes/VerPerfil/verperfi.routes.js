import { Router } from 'express'
import { PerfilController } from '../../controller/VerPerfil/perfil.js'

const router = Router()

// ruta para obtener el perfil
router.get('/:dniPerfil', PerfilController.getMiPerfil)

export default router
