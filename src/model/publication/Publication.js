import connection from '../../settings/database.js'

export class PublicationModel {
  static async create(publication) {
    const queryPublication = `INSERT INTO publicacion (DNI, nombre, precio, descripcion, destacada, producto_a_cambio) VALUES (?, ?, ?, ?, ?, ?);`
    await connection
      .query(queryPublication, [publication.dni, publication.nombre, 0, publication.descripcion, false, publication.producto_a_cambio])
      .catch(error => new Error(error))
    //const queryPublicacion = `INSERT INTO publicacion (DNI) VALUES (?);`
    //await connection.query(queryPublicacion, [publication.dni]).catch(error => new Error(error))
  }
}
