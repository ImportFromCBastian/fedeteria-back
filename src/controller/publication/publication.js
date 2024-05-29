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
      console.log(error)
      res.status(500).json({ error: error })
    }
  }
  static async getAllAcepted(req, res) {
    try {
      const publications = await PublicationModel.getAllAcepted()
      console.log(publications)
      return res.status(200).json(publications)
    } catch (error) {
      res.status(500).json({ error: error })
    }
  }
}
