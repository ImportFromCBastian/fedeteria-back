import { Router } from 'express'
import { WorkerController } from '../../controller/worker/worker.js'

const route = Router()

route.post('/', WorkerController.create)

export default route
