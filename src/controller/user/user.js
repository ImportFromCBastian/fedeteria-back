import { UserModel } from '../../model/user/user.js'
import { ClientModel } from '../../model/user/client/client.js'
import { AdminModel } from '../../model/user/admin/admin.js'
import config from '../../settings/settings.js'
import jwt from 'jsonwebtoken'

export class UserController {
  static async compare(req, res) {
    const credentials = req.body
    const [user] = await UserModel.findByDni(credentials.DNI)
    if (user.length === 0) return res.status(400).json({ message: 'No existe el usuario' })
    const result = await UserModel.compare(credentials.contra, user[0].contra)

    if (result) return res.status(200).json({ ok: result })

    res.status(400).json({ message: 'Los datos ingresados son incorrectos' })
  }

  static async findByDni(req, res) {
    try {
      const dni = req.params.dni
      const [user] = await UserModel.findByDni(dni)
      if (user.length === 0) return res.status(404).json({ message: 'usuario inexistente' })

      return res.status(200).json(user)
    } catch (error) {
      console.log(error)
      res.status(500).json({ error: error })
    }
  }

  static async tokenGenerator(req, res) {
    try {
      const { DNI } = req.body
      const [user] = await UserModel.findByDni(DNI)
      if (user.length === 0) return res.status(404).json({ message: 'usuario inexistente' })

      const [client] = await ClientModel.findByDni(DNI)
      if (client.length !== 0) {
        const token = UserController.generateJwt('cliente', DNI)
        return res.status(201).json({ token: token })
      }

      const [worker] = await WorkerModel.findByDni(DNI)
      if (worker.length !== 0) {
        const token = UserController.generateJwt('empleado', DNI)
        return res.status(201).json({ token: token })
      }

      const [admin] = await AdminModel.findByDni(DNI)
      if (admin.length !== 0) {
        const token = UserController.generateJwt('administrador', DNI)
        return res.status(201).json({ token: token })
      }
    } catch (error) {
      res.status(500).json({ error: error })
    }
  }
  static generateJwt(rol, dni) {
    return jwt.sign(
      {
        DNI: dni,
        rol: rol,
      },
      config.SECRET_WORD,
    )
  }
}
