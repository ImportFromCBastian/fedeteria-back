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
  static async findPublicationById(idPublication) {
    const query = `SELECT * FROM Publicacion WHERE idPublicacion = ?;`
    return await connection.query(query, [idPublication]).catch(error => new Error(error))
  }
  static async update(idPublication, publication) {
    const query = `UPDATE Publicacion SET nombre = ?, descripcion = ?,precio = ?, productoACambio = ?, estado = ? WHERE idPublicacion = ?;`
    return await connection.query(query, [
      publication.nombre,
      publication.descripcion,
      publication.precio,
      publication.producto_a_cambio,
      publication.estado,
      idPublication
    ])
  }
}
