import { FotoModel } from '../../model/publication/Foto.js'
import fotoValidator from '../../model/publication/schema/FotoSchema.js'
import connection from '../../settings/database.js'
export class FotoController {
  static async create(req, res) {
    try {
      const foto = {
        foto: req.file.buffer, // Accede al archivo cargado
        idPublicacion: req.body.idPublicacion // Ejemplo de cómo acceder a otros datos del formulario
      }
      // Realiza la validación de la foto
      const result = fotoValidator(foto)
      if (!result.success) {
        return res.status(400).json(result.error.issues)
      }
      // Crea la foto en la base de datos
      await FotoModel.create(foto)
      res.status(201).json({ message: 'Foto creada con éxito', ok: true })
    } catch (error) {
      console.error('Error al crear la foto:', error)
      res.status(500).json({ error: error.message })
    }
  }
  static async getFotos(req, res) {
    try {
      const idPublicacion = req.params.idPublicacion
      const query = 'SELECT foto FROM Foto WHERE idPublicacion = ?;'
      const [result] = await connection.query(query, [idPublicacion])
      return res.status(200).json(result)
    } catch (error) {
      console.error('Error al conseguir las fotos:', error)
      return res.status(500).json({ error: 'Error al conseguir la fotos' })
    }
  }
}
