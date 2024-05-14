import { FotoModel } from '../../model/publication/Foto.js'
import fotoValidator from '../../model/publication/schema/FotoSchema.js'

export class FotoController {
  static async create(req, res) {
    try {
      const foto = {
        foto: req.file.buffer, // Accede al archivo cargado
        idPublicacion: req.body.idPublicacion, // Ejemplo de cómo acceder a otros datos del formulario
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
}
