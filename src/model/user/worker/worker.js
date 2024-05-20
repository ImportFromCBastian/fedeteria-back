import connection from '../../../settings/database.js'

export class WorkerModel {
  static async create(user) {
    const query = `INSERT INTO Empleado (DNI,idLocal) VALUES (?, ?);`
    return await connection.query(query, [user.dni, user.sucursal]).catch(error => new Error(error))
  }

  static async update(dni, user) {
    const query = `UPDATE Empleado SET idLocal = ? WHERE DNI = ?;`
    return await connection.query(query, [user.idLocal, dni]).catch(error => new Error(error))
  }
  static async findByDni(dni) {
    const query = `SELECT u.DNI,u.nombre,u.apellido,u.mail,u.fechaNacimiento,l.nombre as nombreSucursal , l.idLocal FROM Usuario u INNER JOIN Empleado e ON (e.DNI = u.DNI) INNER JOIN Local l ON (l.idLocal = e.idLocal) WHERE e.DNI = ?;`
    return await connection.query(query, [dni]).catch(error => new Error(error))
  }
}
