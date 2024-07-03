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
    WHERE p.idPublicacion NOT IN (
      SELECT t.productoDeseado
      FROM Trueque t
      WHERE t.realizado IS NOT NULL
    ) AND p.idPublicacion NOT IN (
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
  static async createConsulta(consulta, idPublicacion, dni) {
    const query = `INSERT INTO Consulta (textoConsulta,idPublicacion, dniUsuario ) VALUES (?, ?, ?);`
    return await connection.query(query, [consulta, idPublicacion, dni])
  }
  static async getConsultasById(idPublicacion) {
    const query = `SELECT * FROM Consulta WHERE idPublicacion = ?;`
    const [consultas] = await connection.query(query, [idPublicacion])
    return consultas
  }
  static async createRespuesta(respuesta, idConsulta, dniDueno) {
    const query = `INSERT INTO Respuesta (textoRespuesta, idConsulta, dniDuenoPublicacion) VALUES (?, ?, ?);`
    const result = await connection.query(query, [respuesta, idConsulta, dniDueno])
    return result[0].insertId // Devuelve el ID autoincremental de la respuesta creada
  }
  static async updateConsultaConRespuesta(idConsulta, data) {
    const query = `UPDATE Consulta SET idRespuesta = ? WHERE idConsulta = ?`
    const result = await connection.query(query, [data, idConsulta])
    return result
  }
  static async getRespuestaByIdConsulta(idConsulta) {
    const query = `SELECT textoRespuesta FROM Respuesta WHERE idRespuesta = ?;`
    const [respuesta] = await connection.query(query, [idConsulta])
    console.log(respuesta)
    return respuesta
  }
}
