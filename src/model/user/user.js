import connection from '../../settings/database.js'

export class UserModel {
  static async create(user) {
    const query = `INSERT INTO Usuario (DNI,nombre,apellido, mail, contra,recibeAnuncio,fechaNacimiento) VALUES (?, ?, ?, ?, ?, ?, ?);`
    await connection
      .query(query, [user.dni, user.name, user.lastName, user.email, user.password, user.notification, user.birthdate])
      .catch(error => new Error(error))
  }
  static async findByDni(dni) {
    const query = `SELECT * FROM Usuario WHERE DNI = ?;`
    return await connection.query(query, [dni]).catch(error => new Error(error))
  }

  static async findByEmail(email) {
    const query = `SELECT * FROM Usuario WHERE mail = ?;`
    return await connection.query(query, [email]).catch(error => new Error(error))
  }
}
