import { Router } from 'express'
import { PublicationController } from '../../controller/publication/publication.js'

const router = Router()

router.post('/', PublicationController.create)

router.get('/', PublicationController.getAllAcepted)

export default router
