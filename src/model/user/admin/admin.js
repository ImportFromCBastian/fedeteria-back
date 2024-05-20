import connection from '../../../settings/database.js'

export class AdminModel {
  static async create(user) {
    const query = `INSERT INTO Admin (DNI) VALUES (?);`
    return await connection.query(query, [user.dni]).catch(error => new Error(error))
  }

  static async findByDni(dni) {
    const query = `SELECT u.* FROM Usuario u INNER JOIN Admin a ON (a.DNI = u.DNI) WHERE a.DNI = ?;`
    return await connection.query(query, [dni]).catch(error => new Error(error))
  }
}
