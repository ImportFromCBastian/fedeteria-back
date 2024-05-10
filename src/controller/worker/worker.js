import { WorkerModel } from '../../model/worker/worker.js'
import workerValidator from '../../model/worker/schema/workerSchema.js'
import { encryptPassword } from '../../settings/encryptPassword.js'

export class WorkerController {
  static async create(req, res) {
    try {
      const worker = req.body
      const result = workerValidator(worker)
      if (!result.success) {
        return res.status(400).json(JSON.parse(JSON.stringify(result.error.issues, null, 2)))
      }
      //validar dni unico y validar email unico
      const [dni] = await WorkerModel.findByDni(worker.dni)
      const [email] = await WorkerModel.findByEmail(worker.email)

      if (dni.length > 0) {
        return res.status(400).json({ message: 'El DNI ya esta en uso' })
      }
      if (email.length > 0) {
        return res.status(400).json({ message: 'El email ya esta en uso' })
      }
      // encriptar password con bcrypt
      worker.password = encryptPassword(worker.password)

      await WorkerModel.create(worker)
      res.status(201).json({ ok: true, message: 'Cliente creado con éxito' })
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
      console.log(error)
      res.status(500).json({ error: error })
    }
  }
}
