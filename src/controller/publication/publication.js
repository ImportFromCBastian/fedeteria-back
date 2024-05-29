import { PublicationModel } from '../../model/publication/Publication.js'
import publicationValidator from '../../model/publication/schema/PublicationSchema.js'

export class PublicationController {
  static async create(req, res) {
    try {
      const publication = req.body
      const result = publicationValidator(publication)
      if (!result.success) {
        return res.status(400).json({ error: result.error })
      }
      const insertId = await PublicationModel.create(publication)
      res.status(201).json({ message: insertId, ok: true })
    } catch (error) {
      res.status(500).json({ error: error })
    }
  }
  static async searchById(req, res) {
    try {
      // Obtiene el ID de la publicación de los parámetros de la solicitud
      const idPublication = req.params.idPublicacion
      // hay una función async llamada `findPublicationById` que busca la publicación en la base de datos
      const publication = await PublicationModel.findPublicationById(idPublication)
      // Si no se encuentra la publicación, se responde con un error 404 (No encontrado)
      if (!publication) {
        return res.status(404).json({ error: 'La publicación no fue encontrada.' })
      }
      // Si se encuentra la publicación, se responde con la información de la publicación
      return res.status(200).json({ publication })
    } catch (error) {
      // Si hay un error durante la búsqueda de la publicación, se responde con un error 500 (Error interno del servidor)
      return res.status(500).json({ error: error.message })
    }
  }
}
