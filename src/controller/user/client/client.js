import { UserModel } from '../../../model/user/user.js'
import { ClientModel } from '../../../model/user/client/client.js'
import userValidator from '../../../model/user/schema/userSchema.js'
import { encryptPassword } from '../../../settings/encryptPassword.js'

export class ClientController {
  static async create(req, res) {
    try {
      const client = req.body
      const result = userValidator(client)
      if (!result.success) {
        return res.status(400).json({ message: result.error })
      }
      //validar dni unico y validar email unico
      const [dni] = await UserModel.findByDni(client.dni)
      const [email] = await UserModel.findByEmail(client.email)

      if (dni.length > 0) {
        return res.status(400).json({ message: 'El DNI ya esta en uso' })
      }
      if (email.length > 0) {
        return res.status(400).json({ message: 'El email ya esta en uso' })
      }
      // encriptar password con bcrypt
      client.password = encryptPassword(client.password)

      await UserModel.create(client)
      await ClientModel.create(client)
      res.status(201).json({ ok: true, message: 'Cliente creado con éxito' })
    } catch (error) {
      res.status(500).json({ error: error })
    }
  }

  static async findByDni(req, res) {
    try {
      const dni = req.params.dni
      const [usuario] = await UserModel.findByDni(dni)
      if (usuario.length === 0) {
        return res.status(404).json({ message: 'Usuario no encontrado' })
      }
      const [cliente] = await ClientModel.findByDni(dni)
      if (cliente.length === 0) {
        return res.status(404).json({ message: 'el dni no pertenece a ningun cliente' })
      }
      res.status(200).json(cliente)
    } catch (error) {
      console.log(error)
      res.status(500).json({ error: error })
    }
  }
}
