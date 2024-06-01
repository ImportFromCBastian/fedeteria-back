import { Router } from 'express'
import { NotificacionesController } from '../../controller/Notificaciones/notificacion.js'

const router = Router()

router.get('/:DNI', NotificacionesController.getNotificaciones)
router.post('/marcar_vistas/:DNI', NotificacionesController.marcarComoVistas)
router.post('/eliminar/:ID', NotificacionesController.eliminarNotificacion)
router.post('/enviar', NotificacionesController.enviarNotificacion)
export default router
