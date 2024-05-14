import connection from '../../settings/database.js'

export class SucursalModel {
  static async create(sucursal) {
    const queryUser = `INSERT INTO local (nombre, calle, numero, piso, depto) VALUES (?, ?, ?, ?, ?);`
    return await connection
      .query(queryUser, [sucursal.nombre, sucursal.nombre, sucursal.numero, sucursal.piso, sucursal.depto])
      .catch(error => new Error(error))
  }
}
