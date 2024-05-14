import { z } from 'zod'
const publicationSchema = z.object({
  //el dni va a venir ya del publicante no hay que chequearlo
  dni: z.number().positive(),
  //nombre validations
  nombre: z.string({
    required_error: 'El nombre de la publicacion es requerido',
  }),
  //descripcion validations
  descripcion: z.string({
    required_error: 'Se requiere la descripcion',
  }),
  //producto a cambio validations
  producto_a_cambio: z.string(),
  //estado validations
  estado: z.string({
    required_error: 'Se requiere el estado de la publicacion',
  }),
})

const publicationValidator = publication => {
  return publicationSchema.safeParse(publication)
}

export default publicationValidator
