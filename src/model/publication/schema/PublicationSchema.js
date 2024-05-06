import { z } from 'zod'
const publicationSchema = z.object({
  //el dni va a venir ya del publicante no hay que chequearlo
  dni: z.string(),
  //nombre validations
  nombre: z.string({
    required_error: 'El nombre de la publicacion es requerido',
  }),
  //descripcion validations
  descripcion: z.string({
    required_error: 'Se requiere la descripcion',
  }),
  //producto a cambio validations
  proucto_a_cambio: z.string(),
  //estado validations
  estado: z.boolean().transform(value => (value === true ? 'si' : 'no')),
})

const publicationValidator = publication => {
  return publicationSchema.safeParse(publication)
}

export default publicationValidator
