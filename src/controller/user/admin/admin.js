import { UserModel } from '../../../model/user/user.js'
import { AdminModel } from '../../../model/user/admin/admin.js'

export class AdminController {
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
      res.status(200).json(admin)
    } catch (error) {
      console.log(error)
      res.status(500).json({ error: error })
    }
  }
}
