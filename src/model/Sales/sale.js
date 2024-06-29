import connection from '../../settings/database.js '
export class SaleModel {
  static async create(paymentMethod, clientDNI, workerDNI, precio) {
    const query = `
      INSERT INTO Venta (pago, dniCliente, dniEmpleado,precioTotal)
      VALUES (?, ?, ?,?)
    `
    try {
      const [result] = await connection.query(query, [paymentMethod, clientDNI, workerDNI, precio])
      return result
    } catch (error) {
      console.error(error)
    }
  }
}
