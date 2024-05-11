import connection from '../../settings/database.js'

export class FotoModel {
  static async create(foto) {
    try {
      'cooooooooooooooooncha', foto.idPublicacion
      const queryFoto = `INSERT INTO foto (foto, idPublicacion) VALUES (?, ?);`
      await connection.query(queryFoto, [foto.foto, foto.idPublicacion])
    } catch (error) {
      console.error('Error al insertar la foto:', error)
      throw new Error('Error al insertar la foto')
    }
  }
}
