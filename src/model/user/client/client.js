import connection from '../../../settings/database.js'

export class ClientModel {
  static async update(dni, user) {
    const query = `UPDATE Cliente SET idLocal = ? WHERE DNI = ?;`
    return await connection.query(query, [user.idLocal, dni]).catch(error => new Error(error))
  }
  static async create(user) {
    const query = `INSERT INTO Cliente (DNI,idLocal) VALUES (?,?);`
    return await connection.query(query, [user.dni, user.sucursal]).catch(error => new Error(error))
  }

  static async findByDni(dni) {
    const query = `SELECT u.DNI,u.nombre,u.apellido,u.mail,u.fechaNacimiento,l.nombre as nombreSucursal , l.idLocal FROM Usuario u INNER JOIN Cliente c ON (c.DNI = u.DNI) INNER JOIN Local l ON (l.idLocal = c.idLocal) WHERE c.DNI = ?;`
    return await connection.query(query, [dni]).catch(error => new Error(error))
  }
  static async getClientesPorSucursal() {
    const query =
      'SELECT l.idLocal, l.nombre, COUNT(c.idLocal) AS count FROM Cliente c INNER JOIN Local l ON c.idLocal = l.idLocal GROUP BY l.idLocal, l.nombre;'
    const res = await connection.query(query).catch(error => new Error(error))
    console.log(res)
    return res
  }
}
