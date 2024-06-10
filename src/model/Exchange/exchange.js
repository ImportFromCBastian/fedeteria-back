import connection from '../../settings/database.js'
export class ExchangeModel {
  static async create(mainPublicationId) {
    const query = 'INSERT INTO Trueque (productoDeseado) VALUES (?)'
    return await connection.query(query, [mainPublicationId]).then(([result]) => result.insertId)
  }
  static async findById(id) {
    const query = 'SELECT * FROM Trueque WHERE idTrueque = ?'
    return await connection.query(query, [id])
  }
  static async checkExchangeSuggestionByDNI(DNI) {
    const query = `SELECT  t.* FROM Trueque t INNER JOIN ProductosCambio pc ON t.idTrueque = pc.idTrueque INNER JOIN Publicacion p ON pc.idPublicacion = p.idPublicacion WHERE p.DNI = ? AND t.realizado IS NULL;`

    const [rows] = await connection.query(query, [DNI])
    return rows
  }
  static async getSuggestionByDNI(DNI) {
    const query = `
    SELECT t.productoDeseado,t.idTrueque,COUNT(pc.idPublicacion) as countPublication
    FROM Trueque t INNER JOIN ProductosCambio pc ON (t.idTrueque = pc.idTrueque)
    WHERE realizado IS NULL AND t.productoDeseado IN (
      SELECT p.idPublicacion FROM Publicacion p WHERE p.DNI = ?
    ) GROUP BY t.idTrueque ,t.productoDeseado;`

    const [rows] = await connection.query(query, [DNI]).catch(e => {
      console.log(e)
    })
    return rows
  }
  static async createList(exchangeId, publicationId) {
    const query = 'INSERT INTO ProductosCambio (idTrueque,idPublicacion) VALUES (?,?)'
    return await connection.query(query, [exchangeId, publicationId])
  }

  static async getSuggestionProductById(id) {
    const query = `
    SELECT p.nombre,p.estado,p.idPublicacion,p.DNI, p.descripcion, p.precio
    FROM Trueque t
      INNER JOIN
        ProductosCambio pc ON t.idTrueque = pc.idTrueque
      INNER JOIN
        Publicacion p ON pc.idPublicacion = p.idPublicacion
    WHERE 
      t.idTrueque = ? AND t.realizado IS NULL;`
    const [rows] = await connection.query(query, [id])
    return rows
  }

  static async getMainProductById(id) {
    const query = `
    SELECT p.nombre,p.estado,p.idPublicacion,p.DNI, p.descripcion, p.precio
    FROM Trueque t
      INNER JOIN
        ProductosCambio pc ON t.idTrueque = pc.idTrueque
      INNER JOIN
        Publicacion p ON t.productoDeseado = p.idPublicacion
    WHERE 
      t.idTrueque = ? AND t.realizado IS NULL;`
    const [rows] = await connection.query(query, [id])
    return rows
  }

  static async createPendingExchange(id) {
    const query = `
    UPDATE Trueque
    SET realizado = 2
    WHERE idTrueque = ?;`
    return await connection
      .query(query, [id])
      .then(([result]) => {
        return { ok: true, result }
      })
      .catch(e => {
        return { ok: false, message: e }
      })
  }

  static async deleteSuggestion(id) {
    const deleteProductsQuery = `
    DELETE FROM ProductosCambio pc
    WHERE pc.idTrueque IN (
      SELECT t.idTrueque FROM Trueque t
      WHERE t.productoDeseado = ? 
      AND t.realizado IS NULL
    )
  ;`

    const deleteExchangeQuery = `
    DELETE FROM Trueque t
    WHERE
      t.productoDeseado = ?
        AND
      t.realizado IS NULL;
    `
    try {
      await connection.query(deleteProductsQuery, [id])
      const [result] = await connection.query(deleteExchangeQuery, [id])
      return { ok: true, result }
    } catch (e) {
      return { ok: false, error: e }
    }
  }

  static async getPendingExchange() {
    const query = `
    SELECT t.productoDeseado
    FROM Trueque t
    WHERE t.realizado = 2;
   `
    return await connection.query(query).then(([rows]) => {
      return { ok: true, rows }
    })
  }

  static async getIdExchangeByIdLocal(idLocal) {
    const query = `
    SELECT t.idTrueque
    FROM Trueque t
    WHERE 
      t.idLocal = ? AND t.realizado IS NOT NULL;`
    const [rows] = await connection.query(query, [idLocal])
    return rows
  }

  static async getExchangeMainProductById(id) {
    const query = `
    SELECT p.nombre,p.estado,p.idPublicacion,p.DNI, p.descripcion, p.precio
    FROM Trueque t
      INNER JOIN
        ProductosCambio pc ON t.idTrueque = pc.idTrueque
      INNER JOIN
        Publicacion p ON pc.idPublicacion = p.idPublicacion
    WHERE 
      t.idTrueque = ? AND t.realizado IS NOT NULL;`
    const [rows] = await connection.query(query, [id])
    return rows
  }
}
