import { Router } from 'express'
import { ClientController } from '../../controller/client/client.js'

const router = Router()

router.post('/', ClientController.create)

export default router
