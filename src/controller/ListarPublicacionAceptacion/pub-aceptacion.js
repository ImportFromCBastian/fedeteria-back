import connection from '../../settings/database.js'

export class PublicacionController {
  static async getAll(req, res) {
    const query = `SELECT idPublicacion,nombre FROM Publicacion WHERE precio = 0;`

    const [result] = await connection.query(query)
    return res.status(200).json({ data: result })
  }

  static async eliminateById(req, res) {
    const idPublication = req.params.idPublicacion
    const query = `DELETE FROM Publicacion WHERE idPublicacion = ?;`
    const [result] = await connection.query(query, [idPublication])
    return res.status(200).json({ data: result })
  }
  static async acceptById(req, res) {
    const idPublicacion = req.params.idPublicacion
    const numero = req.body.numero
    const query = ` UPDATE publicacion SET precio = ? WHERE idPublicacion = ?;`
    const [result] = await connection.query(query, [numero, idPublicacion])
    return res.status(200).json({ data: result })
  }
}
