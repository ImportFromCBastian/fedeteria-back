import connection from '../../settings/database.js'

export class PublicationModel {
  static async create(publication) {
    const queryPublication = `INSERT INTO publicacion (DNI, nombre, descripcion, productoACambio) VALUES (?, ?, ?, ?);`
    await connection
      .query(queryPublication, ['44590363', publication.nombre, publication.descripcion, publication.producto_a_cambio])
      .catch(error => new Error(error))
    //const queryPublicacion = `INSERT INTO publicacion (DNI) VALUES (?);`
    //await connection.query(queryPublicacion, [publication.dni]).catch(error => new Error(error))
  }
}
