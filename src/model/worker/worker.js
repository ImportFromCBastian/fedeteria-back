import connection from '../../settings/database.js'

export class WorkerModel {
  static async create(user) {
    const queryUser = `INSERT INTO Usuario (DNI,nombre,apellido, mail, contra,fechaNacimiento) VALUES (?, ?, ?, ?, ?, ?);`
    await connection
      .query(queryUser, [user.dni, user.name, user.lastName, user.email, user.password, user.birthdate])
      .catch(error => new Error(error))
    const workerQuery = `INSERT INTO Empleado (DNI) VALUES (?);`
    return await connection.query(workerQuery, [user.dni]).catch(error => new Error(error))
  }

  static async findByDni(dni) {
    const query = `SELECT e.dni,e.nombre,e.apellido, e.mail FROM Empleado e WHERE DNI = ?;`
    return await connection.query(query, [dni]).catch(error => new Error(error))
  }

  static async findByEmail(email) {
    const query = `SELECT e.mail FROM Empleado e WHERE mail = ?;`
    return await connection.query(query, [email]).catch(error => new Error(error))
  }
}
