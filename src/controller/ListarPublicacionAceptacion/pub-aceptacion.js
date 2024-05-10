import connection from '../../settings/database.js'

export class PublicacionController {
  static async getAll(req, res) {
    const query = `SELECT nombre FROM Publicacion WHERE precio = 0;`

    const [result] = await connection.query(query)
    return res.status(200).json({ data: result })
  }
}
