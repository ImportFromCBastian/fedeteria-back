import { z } from 'zod'

const sucursalSchema = z.object({
  nombre: z.string({
    required_error: 'El nombre de la sucursal es requerido'
  }),

  calle: z.string({
    required_error: 'La calle es requerida'
  }),

  numero: z.coerce
    .number({
      required_error: 'El número es requerido',
      invalid_type_error: 'El número debe ser un número'
    })
    .transform(value => value.toString()),

  piso: z.union([z.string().nullable(), z.null()]).optional(),

  depto: z.union([z.string().nullable(), z.null()]).optional()
})

const sucursalValidator = sucursal => {
  return sucursalSchema.safeParse(sucursal)
}

export default sucursalValidator
