import connection from '../../settings/database.js'

export class DetalleController {
  static async getPub(req, res) {
    const idPublicacion = req.params.idPublicacion
    const query = `SELECT idPublicacion, nombre, precio, descripcion, productoACambio,estado FROM Publicacion WHERE idPublicacion = ?  ;`
    const [result] = await connection.query(query, [idPublicacion])
    return res.status(200).json(result)
  }

  static async getFotos(req, res) {
    try {
      const idPublicacion = req.params.idPublicacion
      const query = 'SELECT foto FROM Foto WHERE idPublicacion = ?;'
      const [result] = await connection.query(query, [idPublicacion])
      // Convertir las imágenes binarias a URLs de datos
      //const fotosUrls = result.map(foto => {
      //const base64Image = Buffer.from(foto, 'binary').toString('base64')
      //return `data:image/png;base64,${base64Image}` // Cambiar 'png' según el formato de tu imagen
      //})
      return res.status(200).json(result)
    } catch (error) {
      console.error('Error al conseguir las fotos:', error)
      return res.status(500).json({ error: 'Error al conseguir la fotos' })
    }
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
