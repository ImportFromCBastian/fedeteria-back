import connection from '../../settings/database.js'
import * as bcrypt from 'bcrypt'

export class UserModel {
  static async update(dni, user) {
    const query = `UPDATE Usuario SET nombre = ?, apellido = ? WHERE DNI = ?;`
    return await connection.query(query, [user.nombre, user.apellido, dni]).catch(error => new Error(error))
  }
  static async create(user) {
    const queryUser = `INSERT INTO Usuario (DNI,nombre,apellido, mail, contra,recibeAnuncio,fechaNacimiento) VALUES (?, ?, ?, ?, ?, ?, ?);`
    await connection
      .query(queryUser, [user.dni, user.name, user.lastName, user.email, user.password, user.notification, user.birthdate])
      .catch(error => new Error(error))
  }
  static async compare(password, hashedPassword) {
    return await bcrypt.compare(password, hashedPassword)
  }

  static async findByDni(dni) {
    const query = `SELECT * FROM Usuario WHERE DNI = ?;`
    return await connection.query(query, [dni]).catch(error => new Error(error))
  }

  static async findByEmail(email) {
    const query = `SELECT * FROM Usuario WHERE mail = ?;`
    return await connection.query(query, [email]).catch(error => new Error(error))
  }
  static async getAll() {
    const query = `SELECT Count(*) AS count FROM Usuario;`
    const [cant] = await connection.query(query).catch(error => new Error(error))
    return cant
  }
}
