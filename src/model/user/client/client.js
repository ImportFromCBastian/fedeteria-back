import connection from '../../../settings/database.js'

export class ClientModel {
  static async create(user) {
    const query = `INSERT INTO Cliente (DNI,idLocal) VALUES (?,?);`
    return await connection.query(query, [user.dni, user.sucursal]).catch(error => new Error(error))
  }

  static async findByDni(dni) {
    const query = `SELECT * FROM Cliente WHERE DNI = ?;`
    return await connection.query(query, [dni]).catch(error => new Error(error))
  }
}
