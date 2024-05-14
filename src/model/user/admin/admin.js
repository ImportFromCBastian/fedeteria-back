import connection from '../../../settings/database.js'

export class AdminModel {
  static async findByDni(dni) {
    const query = `SELECT * FROM Admin WHERE DNI = ?;`
    return await connection.query(query, [dni]).catch(error => new Error(error))
  }
}
