import { UserModel } from '../../../model/user/user.js'
import { AdminModel } from '../../../model/user/admin/admin.js'
import { encryptPassword } from '../../../settings/encryptPassword.js'
import { userValidator, userPartialValidator } from '../../../model/user/schema/userSchema.js'

export class AdminController {
  static async create(req, res) {
    try {
      const admin = req.body
      const result = userValidator(admin)

      if (!result.success) return res.status(400).json({ message: result.error })

      //validar dni unico y validar email unico
      const [dni] = await UserModel.findByDni(admin.dni)
      const [email] = await UserModel.findByEmail(admin.email)

      if (dni.length > 0) return res.status(400).json({ message: 'El DNI ya esta en uso' })

      if (email.length > 0) return res.status(400).json({ message: 'El email ya esta en uso' })

      // encriptar password con bcrypt
      admin.password = encryptPassword(admin.password)

      await UserModel.create(admin)

      await AdminModel.create(admin)
      res.status(201).json({ ok: true, message: 'Administrador creado con éxito' })
    } catch (error) {
      res.status(500).json({ error: error })
    }
  }
  static async update(req, res) {
    try {
      const dni = req.params.dni
      const adminBody = req.body

      const result = userPartialValidator(adminBody)

      if (!result.success) return res.status(400).json({ message: result.error })

      const [admin] = await AdminModel.findByDni(dni)
      if (admin.length === 0) res.status(404).json({ message: 'Administrador no encontrado' })

      if (!result.success) return res.status(400).json({ message: result.error })

      await UserModel.update(dni, adminBody)

      return res.status(200).json({ ok: true, message: 'Administrador actualizado con éxito' })
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
      const [admin] = await AdminModel.findByDni(dni)
      if (admin.length === 0) {
        return res.status(404).json({ message: 'el dni no pertenece a ningun administrador' })
      }
      res.status(200).json({ admin, nombreSucursal: 'Admin' })
    } catch (error) {
      res.status(500).json({ error: error })
    }
  }
}
