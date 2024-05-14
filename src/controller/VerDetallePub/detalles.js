import connection from '../../settings/database.js'

export class DetalleController {
  static async getPub(req, res) {
    const idPublicacion = req.params.idPublicacion
    const query = `SELECT idPublicacion, nombre, precio, descripcion, productoACambio FROM Publicacion WHERE idPublicacion = ?  ;`
    const [result] = await connection.query(query, [idPublicacion])
    console.log(result)
    return res.status(200).json(result)
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
    console.log(numero)
    const query = ` UPDATE publicacion SET precio = ? WHERE idPublicacion = ?;`
    const [result] = await connection.query(query, [numero, idPublicacion])
    return res.status(200).json({ data: result })
  }
}
