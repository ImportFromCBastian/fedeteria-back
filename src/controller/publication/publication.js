import { PublicationModel } from '../../model/publication/publication.js'
import publicationValidator from '../../model/publication/schema/PublicationSchema.js'

export class PublicationController {
  static async create(req, res) {
    try {
      const publication = req.body
      const result = publicationValidator(publication)
      if (!result.success) {
        return res.status(400).json(JSON.parse(JSON.stringify(result.error.issues, null, 2)))
      }
      const insertId = await PublicationModel.create(publication)
      res.status(201).json({ message: insertId, ok: true })
    } catch (error) {
      res.status(500).json({ error: error })
    }
  }
}
