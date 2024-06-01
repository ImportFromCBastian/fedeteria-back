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
  static async delete(id) {
    const queryCliente = `SELECT DNI FROM Cliente WHERE idLocal = ?;`
    const [resultCliente] = await connection.query(queryCliente, [id])

    // Verifica si hay clientes asociados
    if (resultCliente.length > 0) {
      throw new Error('No se puede eliminar la sucursal porque tiene datos asociados.')
    }
    // Si no hay clientes, procede con la eliminación de la sucursal
    const querySucursal = `DELETE FROM Local WHERE idLocal = ?;`
    const result = await connection.query(querySucursal, [id])
    return result
  }
}
