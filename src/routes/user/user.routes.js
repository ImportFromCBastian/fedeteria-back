import { Router } from 'express'
import { ClientController } from '../../controller/user/client/client.js'
import { WorkerController } from '../../controller/user/worker/worker.js'
import { AdminController } from '../../controller/user/admin/admin.js'
import { UserController } from '../../controller/user/user.js'

const router = Router()

// User routes
router.get('/:dni', UserController.findByDni)

// Client routes
router.post('/client', ClientController.create)

router.get('/client/:dni', ClientController.findByDni)

router.patch('/client/:dni', ClientController.update)

// Worker routes
router.post('/worker', WorkerController.create)

router.post('/admin', AdminController.create)

// User auth
router.post('/compare', UserController.compare)

router.post('/generate_token', UserController.tokenGenerator)

router.post('/decode_token', UserController.decodeToken)

export default router
