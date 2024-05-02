import connection from '../../settings/database.js'

export class ClientModel {
  static async create(user) {
    try {
      const query = `INSERT INTO users (name, email, password) VALUES (?, ?, ?)`
      const [rows] = await connection.query(query, [user.name, user.email, user.password])
      return rows
    } catch (error) {
      throw error
    }
  }
}
