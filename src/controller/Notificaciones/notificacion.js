import { NotificacionesModel } from '../../model/notificaciones/Notificacion.js'
export class NotificacionesController {
  static async getNotificaciones(req, res) {
    try {
      const dni = req.params.DNI
      const result = await NotificacionesModel.getNotificaciones([dni])
      return res.status(200).json({ data: result })
    } catch (error) {
      return res.status(500).json({ error: 'Error al conseguir las notificaciones' })
    }
  }
  static async marcarComoVistas(req, res) {
    try {
      const dni = req.params.DNI
      await NotificacionesModel.marcarComoVistas([dni])
      return res.status(200).json({ message: 'Notificaciones marcadas como vistas' })
    } catch (error) {
      return res.status(500).json({ error: 'Error al marcar las notificaciones como vistas' })
    }
  }
  static async enviarNotificacion(req, res) {
    try {
      const notificacion = req.body
      notificacion.DNI = parseInt(notificacion.DNI)
      await NotificacionesModel.create(notificacion)
      res.status(201).json({ ok: true })
    } catch (error) {
      res.status(500).json({ error: error })
    }
  }
  static async eliminarNotificacion(req, res) {
    try {
      const id = req.params.ID
      await NotificacionesModel.eliminar([id])
      res.status(201).json({ ok: true })
    } catch (error) {
      res.status(500).json({ error: error })
    }
  }
}
