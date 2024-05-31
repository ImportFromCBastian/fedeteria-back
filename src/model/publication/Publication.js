import connection from '../../settings/database.js'

export class PublicationModel {
  static async create(publication) {
    const queryPublication = `INSERT INTO publicacion (DNI, nombre, descripcion, productoACambio, estado) VALUES (?, ?, ?, ?, ?);`
    const [result] = await connection.query(queryPublication, [
      publication.dni,
      publication.nombre,
      publication.descripcion,
      publication.producto_a_cambio,
      publication.estado
    ])
    return result.insertId // Devuelve el ID de la publicación creada
  }
  static async getAllAcepted() {
    const queryPublication = `SELECT * FROM publicacion WHERE precio <> 0;`
    const [publications] = await connection.query(queryPublication)
    return publications
  }

  static async findById(id) {
    const query = `SELECT * FROM publicacion WHERE idPublicacion = ?;`
    const [publication] = await connection.query(query, [id])
    return publication[0]
  }

  static async findAllAceptedByDni(dni) {
    const query = `SELECT * FROM Publicacion WHERE DNI = ? AND precio <> 0;`
    const [publication] = await connection.query(query, [dni])
    return publication
  }

  static async findPublicationById(idPublication) {
    const query = `SELECT * FROM Publication WHERE idPublication = ?;`
    return await connection.query(query, [idPublication]).catch(error => new Error(error))
  }
}
