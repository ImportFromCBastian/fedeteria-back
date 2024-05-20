import connection from '../../../settings/database.js'

export class ClientModel {
  static async create(user) {
    const query = `INSERT INTO Cliente (DNI,idLocal) VALUES (?,?);`
    return await connection.query(query, [user.dni, user.sucursal]).catch(error => new Error(error))
  }

  static async findByDni(dni) {
    const query = `SELECT u.DNI,u.nombre,u.apellido,u.mail,u.fechaNacimiento,l.nombre as nombreSucursal FROM Usuario u INNER JOIN Cliente c ON (c.DNI = u.DNI) INNER JOIN Local l ON (l.idLocal = c.idLocal);`
    return await connection.query(query, [dni]).catch(error => new Error(error))
  }
}
