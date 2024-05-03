import connection from '../../settings/database.js'

export class ClientModel {
  static async create(user) {
    const queryUser = `INSERT INTO Usuario (DNI,nombre,apellido, mail, contra,recibeAnuncio,fechaNacimiento) VALUES (?, ?, ?, ?, ?, ?, ?);`
    await connection
      .query(queryUser, [user.dni, user.name, user.lastName, user.email, user.password, user.notification, user.birthdate])
      .catch(error => new Error(error))
    const queryClient = `INSERT INTO Cliente (DNI) VALUES (?);`
    await connection.query(queryClient, [user.dni]).catch(error => new Error(error))
  }
}
