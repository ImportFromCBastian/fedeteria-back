import { Router } from 'express'
import { PublicationController } from '../../controller/publication/publication.js'

const router = Router()

router.post('/', PublicationController.create)

router.get('/', PublicationController.getAllAcepted)

router.get('/notDeleted', PublicationController.getAllAceptedNotDeleted)

router.get('/:id', PublicationController.findById)

router.get('/user/:dni', PublicationController.findAllAceptedByDni)

router.get('/user/notDeleted/:dni', PublicationController.findAllAceptedNotDeletedByDni)

router.patch('/:idPublicacion', PublicationController.updatePublication)

router.get('/buscar_mis_publicaciones/:dni', PublicationController.findAllByDni)
router.get('/get/byQuery/:query', PublicationController.searchByQuery)

router.get('/ready/:id', PublicationController.getReadyToPay)

router.patch('/featured/:id', PublicationController.updateFeatured)

router.post('/consulta', PublicationController.createConsulta)

router.post('/respuesta', PublicationController.createRespuesta)

router.get('/respuesta/:idConsulta', PublicationController.getRespuestaByIdConsulta)

router.patch('/consulta/:idConsulta', PublicationController.updateConsulta)

router.get('/consulta/:idPublicacion', PublicationController.getConsultasById)

router.delete('/consulta/:idConsulta', PublicationController.deleteConsulta)

export default router
