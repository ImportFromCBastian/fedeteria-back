import { WorkerModel } from '../../../model/user/worker/worker.js'
import userValidator from '../../../model/user/schema/userSchema.js'
import { encryptPassword } from '../../../settings/encryptPassword.js'
import { UserModel } from '../../../model/user/user.js'

export class WorkerController {
  static async create(req, res) {
    try {
      const worker = req.body
      const result = userValidator(worker)
      if (!result.success) {
        return res.status(400).json({ message: result.error })
      }
      //validar dni unico y validar email unico
      const [dni] = await UserModel.findByDni(worker.dni)
      const [email] = await UserModel.findByEmail(worker.email)

      if (dni.length > 0) {
        return res.status(400).json({ message: 'El DNI ya esta en uso' })
      }
      if (email.length > 0) {
        return res.status(400).json({ message: 'El email ya esta en uso' })
      }
      // encriptar password con bcrypt
      worker.password = encryptPassword(worker.password)

      await UserModel.create(worker)
      await WorkerModel.create(worker)
      res.status(201).json({ ok: true, message: 'Empleado creado con éxito' })
    } catch (error) {
      res.status(500).json({ error: error })
    }
  }

  static async findByDni(req, res) {
    try {
      const dni = req.params.dni
      const [worker] = await WorkerModel.findByDni(dni)
      if (worker.length === 0) {
        return res.status(404).json({ message: 'Cliente no encontrado' })
      }
      res.status(200).json(worker)
    } catch (error) {
      res.status(500).json({ error: error })
    }
  }
}
