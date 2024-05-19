import connection from '../../../settings/database.js'

export class AdminModel {
  static async create(user) {
    const query = `INSERT INTO Admin (DNI) VALUES (?);`
    return await connection.query(query, [user.dni]).catch(error => new Error(error))
  }

  static async findByDni(dni) {
    const query = `SELECT * FROM Admin WHERE DNI = ?;`
    return await connection.query(query, [dni]).catch(error => new Error(error))
  }
}
