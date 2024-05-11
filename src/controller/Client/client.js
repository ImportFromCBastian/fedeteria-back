import { ClientModel } from '../../model/Client/client.js'
import clientValidator from '../../model/Client/schema/clientSchema.js'
import { encryptPassword } from '../../settings/encryptPassword.js'

export class ClientController {
  static async create(req, res) {
    try {
      const client = req.body
      const result = clientValidator(client)
      if (!result.success) {
        return res.status(400).json(JSON.parse(JSON.stringify(result.error.issues, null, 2)))
      }
      //validar dni unico y validar email unico
      const [dni] = await ClientModel.findByDni(client.dni)
      const [email] = await ClientModel.findByEmail(client.email)

      if (dni.length > 0) {
        return res.status(400).json({ message: 'El DNI ya esta en uso' })
      }
      if (email.length > 0) {
        return res.status(400).json({ message: 'El email ya esta en uso' })
      }
      // encriptar password con bcrypt
      client.password = encryptPassword(client.password)

      await ClientModel.create(client)
      res.status(201).json({ ok: true, message: 'Cliente creado con éxito' })
    } catch (error) {
      res.status(500).json({ error: error })
    }
  }

  static async findByDni(req, res) {
    try {
      const dni = req.params.dni
      const [client] = await ClientModel.findByDni(dni)
      if (client.length === 0) {
        return res.status(404).json({ message: 'Cliente no encontrado' })
      }
      res.status(200).json(client)
    } catch (error) {
      console.log(error)
      res.status(500).json({ error: error })
    }
  }
  static async compare(req, res) {
    const body = req.body
    const [user] = await ClientModel.findByDni(body.DNI)
    const contra = user[0].contra
    //en este moment tenemos hashed password y password
    const comparacion = await ClientModel.compare(body.contra, contra)
    return res.status(200).json({ ok: comparacion })
  }
}
