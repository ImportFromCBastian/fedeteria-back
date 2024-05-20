import { UserModel } from '../../../model/user/user.js'
import { ClientModel } from '../../../model/user/client/client.js'
import { userPartialValidator, userValidator } from '../../../model/user/schema/userSchema.js'
import { encryptPassword } from '../../../settings/encryptPassword.js'
import config from '../../../settings/settings.js'

export class ClientController {
  static async create(req, res) {
    try {
      const client = req.body
      const result = userValidator(client)

      if (!result.success) return res.status(400).json({ message: result.error })

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

      await ClientModel.create(result.data)
      //send mail to the client
      const mailResopnse = await fetch(`${config.BASE_URL}/mailing`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: client.email
        })
      })

      res.status(201).json({ ok: true, message: 'Cliente creado con éxito', id: mailResopnse })
    } catch (error) {
      res.status(500).json({ error: error })
    }
  }
  static async update(req, res) {
    try {
      const dni = req.params.dni
      const clientBody = req.body

      const result = userPartialValidator(clientBody)

      if (!result.success) return res.status(400).json({ message: result.error })

      const [client] = await ClientModel.findByDni(dni)
      if (client.length === 0) res.status(404).json({ message: 'Cliente no encontrado' })

      if (!result.success) return res.status(400).json({ message: result.error })
      await UserModel.update(dni, clientBody)
      await ClientModel.update(dni, clientBody)
      return res.status(200).json({ ok: true, message: 'Cliente actualizado con éxito' })
    } catch (error) {
      res.status(500).json({ error: error })
    }
  }

  static async findByDni(req, res) {
    try {
      const dni = req.params.dni
      const [user] = await UserModel.findByDni(dni)
      if (user.length === 0) {
        return res.status(404).json({ message: 'Usuario no encontrado' })
      }
      const [client] = await ClientModel.findByDni(dni)
      if (client.length === 0) {
        return res.status(404).json({ message: 'El dni no pertenece a ningun cliente' })
      }
      res.status(200).json(client[0])
    } catch (error) {
      res.status(500).json({ error: error })
    }
  }
}
