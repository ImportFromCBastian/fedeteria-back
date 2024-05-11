import connection from '../../settings/database.js'
import * as bcrypt from 'bcrypt'

export class ClientModel {
  static async create(user) {
    const queryUser = `INSERT INTO Usuario (DNI,nombre,apellido, mail, contra,recibeAnuncio,fechaNacimiento) VALUES (?, ?, ?, ?, ?, ?, ?);`
    await connection
      .query(queryUser, [user.dni, user.name, user.lastName, user.email, user.password, user.notification, user.birthdate])
      .catch(error => new Error(error))
    const queryClient = `INSERT INTO Cliente (DNI) VALUES (?);`
    return await connection.query(queryClient, [user.dni]).catch(error => new Error(error))
  }
  static async compare(password, hashedPassword) {
    return await bcrypt.compare(password, hashedPassword)
  }

  static async findByDni(dni) {
    const query = `SELECT * FROM Usuario WHERE DNI = ?;`
    return await connection.query(query, [dni]).catch(error => new Error(error))
  }

  static async findByEmail(email) {
    const query = `SELECT u.mail FROM Usuario u WHERE mail = ?;`
    return await connection.query(query, [email]).catch(error => new Error(error))
  }
}
