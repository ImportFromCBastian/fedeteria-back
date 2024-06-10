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
    const queryPublication = `SELECT p.*
  FROM Publicacion p
  LEFT JOIN Trueque t ON p.idPublicacion = t.productoDeseado AND t.realizado IN (1, 2, 3)
  LEFT JOIN ProductosCambio pc ON p.idPublicacion = pc.idPublicacion
  LEFT JOIN Trueque t2 ON pc.idTrueque = t2.idTrueque AND t2.realizado IN (1, 2, 3)
  WHERE p.precio > 0
    AND t.idTrueque IS NULL
  AND t2.idTrueque IS NULL;;`
    const [publications] = await connection.query(queryPublication)
    return publications
  }

  static async findById(id) {
    const query = `SELECT * FROM publicacion WHERE idPublicacion = ?;`
    const [publication] = await connection.query(query, [id])
    return publication[0]
  }

  static async findAllAceptedByDni(dni) {
    const query = `SELECT p.*
    FROM Publicacion p
    LEFT JOIN Trueque t ON p.idPublicacion = t.productoDeseado AND t.realizado IN (1, 2, 3)
    LEFT JOIN ProductosCambio pc ON p.idPublicacion = pc.idPublicacion
    LEFT JOIN Trueque t2 ON pc.idTrueque = t2.idTrueque AND t2.realizado IN (1, 2, 3)
    WHERE p.precio > 0
      AND t.idTrueque IS NULL
    AND t2.idTrueque IS NULL
    AND p.DNI = ?;`
    const [publication] = await connection.query(query, [dni])
    return publication
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
      publication.productoACambio,
      publication.estado,
      idPublication
    ])
  }
}
