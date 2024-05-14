import connection from '../../settings/database.js'

export class PerfilController {
  static async getMiPerfil(req, res) {
    const dniPerfil = req.params.dniPerfil
    const query = `SELECT DNI, nombre, apellido, mail, fechaNacimiento FROM usuario WHERE DNI = ?;`
    const [result] = await connection.query(query, [dniPerfil])
    return res.status(200).json({ data: result })
  }
}
