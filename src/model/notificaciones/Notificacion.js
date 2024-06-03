import connection from '../../settings/database.js'

export class NotificacionesModel {
  static async getNotificaciones(dni) {
    const query = `SELECT * FROM notificacion WHERE DNI = ? ORDER BY idNotificacion DESC;`
    const [result] = await connection.query(query, [dni])
    return result
  }
  static async marcarComoVistas(dni) {
    const query = `UPDATE notificacion SET nueva = 'no' WHERE DNI = ?;`
    await connection.query(query, [dni])
  }
  static async create(notificacion) {
    try {
      const queryNotificacion = `INSERT INTO Notificacion (tipo, contenido, DNI) VALUES (?, ?, ?);`
      const [result] = await connection.query(queryNotificacion, [notificacion.tipo, notificacion.contenido, notificacion.DNI])
      return result
    } catch (error) {
      console.error('Database error:', error)
      throw new Error('Error al agregar la notificación a la base de datos')
    }
  }
  static async eliminar(id) {
    try {
      const query = `DELETE FROM Notificacion WHERE idNotificacion = ?;`
      const [result] = await connection.query(query, [id])
      return result
    } catch (error) {
      console.error('Database error:', error)
      throw new Error('Error al eliminar la notificación de la base de datos')
    }
  }
}
