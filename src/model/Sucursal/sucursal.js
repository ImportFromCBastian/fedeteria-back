import connection from '../../settings/database.js'

export class SucursalModel {
  static async create(sucursal) {
    const querySucursal = `INSERT INTO Local (nombre, calle, numero, piso, depto) VALUES (?, ?, ?, ?, ?);`
    try {
      const result = await connection.query(querySucursal, [sucursal.nombre, sucursal.calle, sucursal.numero, sucursal.piso, sucursal.depto])
      return result
    } catch (error) {
      throw error
    }
  }
}
