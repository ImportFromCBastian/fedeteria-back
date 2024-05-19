import connection from '../../settings/database.js'

export class SucursalModel {
  static async getAll() {
    const querySucursal = `SELECT * FROM Local;`
    const [result] = await connection.query(querySucursal)
    return result
  }
  static async create(sucursal) {
    const querySucursal = `INSERT INTO Local (nombre, calle, numero, piso, depto) VALUES (?, ?, ?, ?, ?);`
    const result = await connection.query(querySucursal, [sucursal.nombre, sucursal.calle, sucursal.numero, sucursal.piso, sucursal.depto])
    return result
  }
}
