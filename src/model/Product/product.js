import connection from '../../settings/database.js'

export class ProductModel {
  static async getAll() {
    const query = `
    SELECT *
    FROM Producto
    `
    const [rows] = await connection.query(query)
    return rows
  }

  static async create(name, price) {
    const query = `
    INSERT INTO Producto
    (nombre, precio)
    VALUES
    (?, ?)
    `
    const [rows] = await connection.query(query, [name, price])
    return rows
  }
}
