import connection from '../../settings/database.js'

export class PublicationModel {
  static async create(publication) {
    const queryPublication = `INSERT INTO publicacion (DNI, nombre, precio, descripcion, destacada, productoACambio) VALUES (?, ?, ?, ?, ?, ?);`
    await connection
      .query(queryPublication, ['44590363', publication.nombre, 0, publication.descripcion, 'si', publication.producto_a_cambio])
      .catch(error => new Error(error))
    //const queryPublicacion = `INSERT INTO publicacion (DNI) VALUES (?);`
    //await connection.query(queryPublicacion, [publication.dni]).catch(error => new Error(error))
  }
}
