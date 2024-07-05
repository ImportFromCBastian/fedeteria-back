import { PublicationModel } from '../../model/publication/Publication.js'
import { publicationValidator, partialPublicationValidator } from '../../model/publication/schema/PublicationSchema.js'

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
      console.log(error)
      res.status(500).json({ error: error })
    }
  }

  static async getAllAcepted(req, res) {
    try {
      const publications = await PublicationModel.getAllAcepted()
      return res.status(200).json(publications)
    } catch (error) {
      res.status(500).json({ error: error })
    }
  }

  static async findById(req, res) {
    try {
      const { id } = req.params
      const publication = await PublicationModel.findById(id)
      if (!publication) {
        return res.status(404).json({ error: 'Publication not found' })
      }
      return res.status(200).json(publication)
    } catch (error) {
      res.status(500).json({ error: error })
    }
  }

  static async findAllAceptedByDni(req, res) {
    try {
      const { dni } = req.params
      const publications = await PublicationModel.findAllAceptedByDni(dni)
      return res.status(200).json(publications)
    } catch (error) {
      console.log(error)
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
  static async updatePublication(req, res) {
    try {
      const { idPublicacion } = req.params
      const publication = req.body
      const result = partialPublicationValidator(publication)
      if (!result.success) {
        return res.status(400).json({ error: result.error })
      }
      const updatedPublication = await PublicationModel.update(idPublicacion, publication)
      return res.status(200).json(updatedPublication)
    } catch (error) {
      console.log(error)
      return res.status(500).json({ error: error })
    }
  }
  static async findAllByDni(req, res) {
    try {
      const { dni } = req.params
      const publications = await PublicationModel.findAllByDni(dni)
      return res.status(200).json(publications)
    } catch (error) {
      console.log(error)
      res.status(500).json({ error: error })
    }
  }
  static async createConsulta(req, res) {
    try {
      const { consulta, idPublicacion, dni } = req.body
      const result = await PublicationModel.createConsulta(consulta, idPublicacion, dni)
      return res.status(201).json(result)
    } catch (error) {
      console.log(error)
      res.status(500).json({ error: error })
    }
  }
  static async getConsultasById(req, res) {
    try {
      const { idPublicacion } = req.params
      const result = await PublicationModel.getConsultasById(idPublicacion)
      return res.status(200).json(result)
    } catch (error) {
      console.log(error)
      res.status(500).json({ error: error })
    }
  }
  static async createRespuesta(req, res) {
    try {
      const { respuesta, idConsulta, dniDueno } = req.body
      const result = await PublicationModel.createRespuesta(respuesta, idConsulta, dniDueno)
      return res.status(201).json(result)
    } catch (error) {
      console.log(error)
      res.status(500).json({ error: error })
    }
  }
  static async updateConsulta(req, res) {
    try {
      const { idConsulta } = req.params
      const { data } = req.body
      const result = await PublicationModel.updateConsultaConRespuesta(idConsulta, data)
      return res.status(200).json(result)
    } catch (error) {
      console.log(error)
      res.status(500).json({ error: error })
    }
  }
  static async getRespuestaByIdConsulta(req, res) {
    try {
      const { idConsulta } = req.params
      const result = await PublicationModel.getRespuestaByIdConsulta(idConsulta)
      console.log(result[0])
      return res.status(200).json(result)
    } catch (error) {
      console.log(error)
      res.status(500).json({ error: error })
    }
  }
}
