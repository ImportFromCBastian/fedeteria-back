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
      t.idTrueque = ?;`
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
      t.idTrueque = ?;`
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
    // borra la lista de productos ofrecidos donde el producto deseado es igual al id
    const deleteProductsByMainProduct = `
      DELETE FROM ProductosCambio pc
      WHERE pc.idTrueque IN (
        SELECT t.idTrueque
        FROM Trueque t
        WHERE t.productoDeseado = ? AND t.realizado IS NULL
      )
    ;`

    // borra todos los trueques donde el producto deseado es igual al id
    const deleteOtherSuggestion = `
      DELETE FROM Trueque t
      WHERE t.productoDeseado = ? AND t.realizado IS NULL    
    `

    // borra de la lista de productos donde el producto esta involucrado en otra sugerencia donde no es nulo
    const deleteFromListOfProducts = `
        DELETE FROM ProductosCambio pc
        WHERE pc.idPublicacion = ? AND pc.idTrueque NOT IN (
          SELECT t.idTrueque
          FROM Trueque t
          WHERE t.realizado IS NOT NULL
        )
      `
    const result = []
    try {
      // Delete list of products of the main product where realizado is null
      result.push(await connection.query(deleteProductsByMainProduct, [id]))
      // Delete trueque suggestion of the main product where realizado is null
      result.push(await connection.query(deleteOtherSuggestion, [id]))
      // Delete from list where the product is involved in other suggestion where is not null
      result.push(await connection.query(deleteFromListOfProducts, [id]))
      return { ok: true, message: result }
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

  static async checkExchangeSuggestionAcceptedsByDNI(DNI) {
    const query = `
    SELECT t.productoDeseado,t.idTrueque,COUNT(pc.idPublicacion) as countPublication
    FROM Trueque t INNER JOIN ProductosCambio pc ON (t.idTrueque = pc.idTrueque)
    WHERE t.realizado = 2 AND t.productoDeseado IN (
      SELECT p.idPublicacion
      FROM Publicacion p
      WHERE p.DNI = ?
    )
    GROUP BY t.idTrueque ,t.productoDeseado;`

    const [rows] = await connection.query(query, [DNI]).catch(e => {
      console.log(e)
    })
    return rows
  }

  static async getAvailableTimes(selectedSucursal, day) {
    const sucursal = selectedSucursal
    const dia = day
    const query = `
    SELECT t.hora
    FROM Trueque t
    WHERE 
      t.idLocal = ? AND t.fecha = ? AND t.hora IS NOT NULL;`
    const [rows] = await connection.query(query, [sucursal, dia])
    return rows
  }

  static async createExchangeDetailsById(id, codigo, data) {
    const { selectedSucursal, selectedDay, selectedTime } = data
    const query = `
    UPDATE Trueque 
    SET idLocal = ?, fecha = ?, hora = ?, realizado = ?, codigo= ?
    WHERE idTrueque = ?;`
    try {
      await connection.query(query, [selectedSucursal, selectedDay, selectedTime, 3, codigo, id])
      return { ok: true }
    } catch (e) {
      return { ok: false, error: e }
    }
  }
  static async getTrueques() {
    const query = `
    SELECT l.nombre, t.fecha, COUNT(*) AS CantidadDeTrueques
    FROM Local l
      LEFT JOIN
        Trueque t ON l.idLocal = t.idLocal
    WHERE realizado = 1
    GROUP BY t.idLocal, l.nombre, t.fecha;`
    try {
      const [rows] = await connection.query(query)
      return rows
    } catch (e) {
      return { ok: false, error: e }
    }
  }

  static async updateExchangeStatus(id, status) {
    const query = `
    UPDATE Trueque
    SET realizado = ?
    WHERE idTrueque = ?;`
    try {
      await connection.query(query, [status, id])
      return { ok: true }
    } catch (e) {
      return { ok: false, error: e }
    }
  }

  static async getByExchangeCode(code) {
    const query = `
    SELECT *
    FROM Trueque t
    WHERE t.codigo = ? AND t.realizado = 3;`
    try {
      const [rows] = await connection.query(query, [code])
      return rows
    } catch (e) {
      return { ok: false, e }
    }
  }

  static async getProductListStateThree(id) {
    const query = `
    SELECT p.nombre,p.estado,p.idPublicacion,p.DNI, p.descripcion, p.precio
    FROM Trueque t
      INNER JOIN
        ProductosCambio pc ON t.idTrueque = pc.idTrueque
      INNER JOIN
        Publicacion p ON pc.idPublicacion = p.idPublicacion
    WHERE 
      t.idTrueque = ? AND t.realizado = 3;`
    const [rows] = await connection.query(query, [id])
    return rows
  }

  static async getClients(idTrueque) {
    const clientArray = []

    const queryMainProduct = `
    SELECT p.DNI,p.nombre
    FROM Publicacion p
    WHERE p.idPublicacion IN (
      SELECT t.productoDeseado
      FROM Trueque t
      WHERE t.productoDeseado = p.idPublicacion AND t.idTrueque = ?
    )
    `

    const queryOfferedProduct = `
    SELECT p.DNI,p.nombre
    FROM Publicacion p
    WHERE p.idPublicacion IN (
      SELECT pc.idPublicacion
      FROM ProductosCambio pc
      WHERE pc.idTrueque = ? AND pc.idPublicacion = p.idPublicacion
    )
    `
    const [mainProduct] = await connection.query(queryMainProduct, [idTrueque])
    clientArray.push(mainProduct)
    const [offeredProduct] = await connection.query(queryOfferedProduct, [idTrueque])
    clientArray.push(offeredProduct)

    return clientArray
  }

  static async getSentSuggestionByDNI(DNI) {
    const query = `
    SELECT t.idTrueque, t.productoDeseado, COUNT(pc.idPublicacion) as countPublication
    FROM Trueque t
    INNER JOIN ProductosCambio pc ON t.idTrueque = pc.idTrueque
    INNER JOIN Publicacion p ON pc.idPublicacion = p.idPublicacion
    WHERE p.DNI = ? AND t.realizado IS NULL
    GROUP BY t.idTrueque, t.productoDeseado;
  `
    try {
      const [rows] = await connection.query(query, [DNI])
      return rows
    } catch (error) {
      console.error('Error fetching sent suggestions:', error)
      return []
    }
  }

  static async getEveryExchangeByDNI(DNI) {
    const query = `
  SELECT 
    t.idTrueque, 
    t.productoDeseado, 
    t.fecha, 
    t.realizado,
    t.hora,
    COUNT(pc.idPublicacion) as countPublication,
    CASE 
      WHEN t.productoDeseado IN (
        SELECT p.idPublicacion
        FROM Publicacion p
        WHERE p.DNI = ?
      ) THEN 'desired'
      ELSE 'offered'
    END as role
  FROM Trueque t
  LEFT JOIN ProductosCambio pc ON t.idTrueque = pc.idTrueque
  WHERE t.realizado IS NOT NULL
    AND (
      t.productoDeseado IN (
        SELECT p.idPublicacion
        FROM Publicacion p
        WHERE p.DNI = ?
      )
      OR pc.idPublicacion IN (
        SELECT p.idPublicacion
        FROM Publicacion p
        WHERE p.DNI = ?
      )
    )
  GROUP BY t.idTrueque, t.productoDeseado;
  `
    try {
      const [rows] = await connection.query(query, [DNI, DNI, DNI])
      return rows
    } catch (error) {
      console.error('Error fetching every exchange:', error)
      return []
    }
  }

  static async getIdExchangeByIdLocal(idLocal) {
    const query = `
    SELECT t.idTrueque,t.realizado,t.productoDeseado,COUNT(pc.idPublicacion) as countPublication,p.idPublicacion
    FROM Trueque t
      INNER JOIN
        ProductosCambio pc ON t.idTrueque = pc.idTrueque
      INNER JOIN
        Publicacion p ON pc.idPublicacion = p.idPublicacion
    WHERE 
      t.idLocal = ? AND t.realizado IS NOT NULL
    GROUP BY
    t.idTrueque,t.realizado,t.productoDeseado,p.idPublicacion;`
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
        Publicacion p ON t.productoDeseado = p.idPublicacion
    WHERE 
      t.idTrueque = ? AND t.realizado IS NOT NULL;`
    const [rows] = await connection.query(query, [id])
    return rows
  }

  static async getExchangeInfoById(id) {
    const query = `
    SELECT t.idTrueque, t.realizado, t.productoDeseado, t.idLocal, t.fecha, t.hora
FROM Trueque t
INNER JOIN ProductosCambio pc ON t.idTrueque = pc.idTrueque
INNER JOIN Publicacion p ON pc.idPublicacion = p.idPublicacion
WHERE t.idTrueque = ?
ORDER BY t.fecha ASC;`
    const [rows] = await connection.query(query, [id])
    return rows
  }

  static async getLast20Exchanges() {
    const query = `
    SELECT 
      t.idTrueque, 
      t.realizado, 
      t.productoDeseado, 
      t.idLocal, 
      t.fecha, 
      t.hora,
      COUNT(pc.idPublicacion) as countPublication
    FROM Trueque t
    LEFT JOIN ProductosCambio pc ON t.idTrueque = pc.idTrueque
    WHERE t.realizado = 1
    GROUP BY t.idTrueque, t.productoDeseado
    ORDER BY t.fecha DESC, t.hora DESC
    LIMIT 20;
  `
    try {
      const [rows] = await connection.query(query)
      return rows
    } catch (error) {
      console.error('Error fetching the last 20 exchanges:', error)
      return []
    }
  }
  static async getExchangeProductById(id) {
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
