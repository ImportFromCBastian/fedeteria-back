import connection from '../../settings/database.js '
export class SaleModel {
  static async create(paymentMethod, clientDNI, workerDNI, precio, idLocal) {
    const query = `
      INSERT INTO Venta (pago, dniCliente, dniEmpleado,precioTotal, idLocal,fecha)
      VALUES (?,?,?,?,?,NOW())
    `
    try {
      const [result] = await connection.query(query, [paymentMethod, clientDNI, workerDNI, precio, idLocal])
      return result
    } catch (error) {
      console.error(error)
    }
  }
}
