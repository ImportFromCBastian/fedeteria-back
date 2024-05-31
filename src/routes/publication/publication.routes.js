import { Router } from 'express'
import { PublicationController } from '../../controller/publication/publication.js'

const router = Router()

router.post('/', PublicationController.create)

router.get('/', PublicationController.getAllAcepted)

router.get('/:id', PublicationController.findById)

router.get('/user/:dni', PublicationController.findAllAceptedByDni)

export default router
