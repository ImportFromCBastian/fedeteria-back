import { Router } from 'express'
import { FotoController } from '../../controller/publication/foto.js'
import upload from '../../middleware/multerConfig.js'
const router = Router()

router.post('/', upload.single('foto'), FotoController.create)
router.get('/:idPublicacion/fotos', FotoController.getFotos)
export default router
