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
    const queryPublication = `
    SELECT p.*
    FROM Publicacion p
    WHERE p.precio <> 0
      AND p.idPublicacion NOT IN (
        SELECT t.productoDeseado
        FROM Trueque t
        WHERE t.realizado IS NOT NULL
      ) 
      AND p.idPublicacion NOT IN (
        SELECT pc.idPublicacion
        FROM ProductosCambio pc
        INNER JOIN Trueque t ON pc.idTrueque = t.idTrueque
        WHERE t.realizado IS NOT NULL
      );`
    const [publications] = await connection.query(queryPublication)
    return publications
  }

  static async findById(id) {
    const query = `SELECT * FROM publicacion WHERE idPublicacion = ?;`
    const [publication] = await connection.query(query, [id])
    return publication[0]
  }

  static async findAllAceptedByDni(dni) {
    const query = `
    SELECT p.*
    FROM Publicacion p
    WHERE p.idPublicacion NOT IN (
      SELECT t.productoDeseado
      FROM Trueque t
      WHERE t.realizado IS NOT NULL
    ) AND p.idPublicacion NOT IN (
     SELECT pc.idPublicacion
      FROM ProductosCambio pc
      INNER JOIN Trueque t ON pc.idTrueque = t.idTrueque
      WHERE t.realizado IS NOT NULL
    ) AND p.DNI = ?;`
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
  static async findAllByDni(dni) {
    const query = `SELECT p.*
    FROM Publicacion p
    WHERE p.DNI = ?;`
    const [publication] = await connection.query(query, [dni])
    return publication
  }
}
