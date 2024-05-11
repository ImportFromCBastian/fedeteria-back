import connection from '../../settings/database.js'

export class PublicationModel {
  static async create(publication) {
    const queryPublication = `INSERT INTO publicacion (DNI, nombre, descripcion, productoACambio) VALUES (?, ?, ?, ?);`
    const [result] = await connection.query(queryPublication, [
      '44590363',
      publication.nombre,
      publication.descripcion,
      publication.producto_a_cambio,
    ])
    return result.insertId // Devuelve el ID de la publicación creada
  }
}
