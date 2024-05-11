import { Router } from 'express'
import { ClientController } from '../../controller/user/client/client.js'
import { WorkerController } from '../../controller/user/worker/worker.js'

const router = Router()

router.post('/client', ClientController.create)

router.post('/worker', WorkerController.create)

export default router
