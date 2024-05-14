import * as bcrypt from 'bcrypt'

export const encryptPassword = password => {
  const saltRounds = 10
  const salt = bcrypt.genSaltSync(saltRounds)
  return bcrypt.hashSync(password, salt)
}
