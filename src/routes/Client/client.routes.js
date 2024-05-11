import { Router } from 'express'
import { ClientController } from '../../controller/Client/client.js'

const router = Router()

router.post('/', ClientController.create)

router.get('/:dni', ClientController.findByDni)

router.post('/compare', ClientController.compare)

export default router
