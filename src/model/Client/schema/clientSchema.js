import { z } from 'zod'
const clientSchema = z.object({
  //dni validations
  dni: z.coerce
    .number({
      required_error: 'El DNI es requerido',
      invalid_type_error: 'El DNI debe ser un número',
    })
    .transform(value => value.toString()),
  //firstName validations
  name: z.string({
    required_error: 'El nombre es requerido',
  }),
  //lastName validations
  lastName: z.string({
    required_error: 'El apellido es requerido',
  }),
  //email validations
  email: z.string().email({
    required_error: 'El email es requerido',
    invalid_type_error: 'El email no es válido',
  }),
  //password validations
  password: z
    .string()
    .min(6, {
      message: 'La contraseña debe tener al menos 6 caracteres',
    })
    .regex(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/, {
      message: 'La contraseña debe tener al menos un caracter especial',
    })
    .regex(/[A-Z]/g, {
      message: 'La contraseña debe tener al menos una letra mayuscula',
    }),
  //birthdate validations
  birthdate: z
    .string()
    .date()
    .refine(
      date => {
        const today = new Date()
        const birthday = new Date(date)
        const age = today.getFullYear() - birthday.getFullYear()
        if (age === 18) {
          // Si la persona tiene 18 años, comprobamos si su mes y día de nacimiento ya han pasado en el año actual
          const isAdult =
            today.getMonth() > birthday.getMonth() || (today.getMonth() === birthday.getMonth() && today.getDate() >= birthday.getDate())
          return isAdult
        }
        return age > 18
      },
      {
        message: 'La persona debe ser mayor de edad.',
      },
    ),
  notification: z.boolean().transform(value => (value === true ? 'si' : 'no')),
})

const clientValidator = client => {
  return clientSchema.safeParse(client)
}

export default clientValidator
