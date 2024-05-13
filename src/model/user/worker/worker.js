import connection from '../../../settings/database.js'

export class WorkerModel {
  static async create(user) {
    const query = `INSERT INTO Empleado (DNI) VALUES (?);`
    return await connection.query(query, [user.dni]).catch(error => new Error(error))
  }
}
