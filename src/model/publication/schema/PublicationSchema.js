import { z } from 'zod'
const publicationSchema = z.object({
  //el dni va a venir ya del publicante no hay que chequearlo
  dni: z.number({ invalid_type_error: 'El dni debe ser un numero' }).positive(),
  //nombre validations
  nombre: z.string({
    required_error: 'El nombre de la publicacion es requerido'
  }),
  //descripcion validations
  descripcion: z.string({
    required_error: 'Se requiere la descripcion'
  }),
  //producto a cambio validations
  producto_a_cambio: z.string().optional(),
  //estado validations
  estado: z.string({
    required_error: 'Se requiere el estado de la publicacion'
  })
})
const partialPublicationSchema = z.object({
  //nombre validations
  nombre: z.string({
    required_error: 'El nombre de la publicacion es requerido'
  }),
  //descripcion validations
  descripcion: z.string({
    required_error: 'Se requiere la descripcion'
  }),
  precio: z.number().min(0),
  //producto a cambio validations
  productoACambio: z.string(),
  //estado validations
  estado: z.string({
    required_error: 'Se requiere el estado de la publicacion'
  })
})

export const publicationValidator = publication => {
  return publicationSchema.safeParse(publication)
}
export const partialPublicationValidator = publication => {
  return partialPublicationSchema.partial().safeParse(publication)
}
export default { publicationValidator, partialPublicationValidator }
