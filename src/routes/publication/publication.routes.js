import { Router } from 'express'
import { PublicationController } from '../../controller/publication/publication.js'

const router = Router()

router.post('/', PublicationController.create)

router.get('/', PublicationController.getAllAcepted)

router.get('/:id', PublicationController.findById)

router.get('/user/:dni', PublicationController.findAllAceptedByDni)

router.patch('/:idPublicacion', PublicationController.updatePublication)

router.get('/buscar_mis_publicaciones/:dni', PublicationController.findAllByDni)

router.post('/consulta', PublicationController.createConsulta)

router.post('/respuesta', PublicationController.createRespuesta)

router.get('/respuesta/:idConsulta', PublicationController.getRespuestaByIdConsulta)

router.patch('/consulta/:idConsulta', PublicationController.updateConsulta)

router.get('/consulta/:idPublicacion', PublicationController.getConsultasById)

export default router
