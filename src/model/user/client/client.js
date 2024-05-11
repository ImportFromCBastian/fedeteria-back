import connection from '../../../settings/database.js'

export class ClientModel {
  static async create(user) {
    const query = `INSERT INTO Cliente (DNI) VALUES (?);`
    return await connection.query(query, [user.dni]).catch(error => new Error(error))
  }
}
