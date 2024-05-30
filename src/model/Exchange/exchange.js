import connection from '../../settings/database.js'
export class ExchangeModel {
  static async create(mainPublicationId) {
    const query = 'INSERT INTO Trueque (productoDeseado,idLocal) VALUES (?,?)'
    return await connection.query(query, [mainPublicationId, 1]).then(([result]) => result.insertId)
  }
  static async findById(id) {
    const query = 'SELECT * FROM Trueque WHERE idTrueque = ?'
    return await connection.query(query, [id])
  }
  static async checkExchangeSuggestionByDNI(DNI) {
    const query = `SELECT  t.productoDeseado FROM Trueque t INNER JOIN ProductosCambio pc ON t.idTrueque = pc.idTrueque INNER JOIN Publicacion p ON pc.idPublicacion = p.idPublicacion WHERE p.DNI = ? AND t.realizado IS NULL;`

    const [rows] = await connection.query(query, [DNI])
    return rows
  }
  static async createList(exchangeId, publicationId) {
    const query = 'INSERT INTO ProductosCambio (idTrueque,idPublicacion) VALUES (?,?)'
    return await connection.query(query, [exchangeId, publicationId])
  }
}
