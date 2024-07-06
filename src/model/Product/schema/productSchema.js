import * as z from 'zod'

export const productSchema = z.object({
  nombre: z.string({ message: 'El nombre debe ser un texto' }),
  precio: z.number().positive({ message: 'El precio debe ser positivo' })
})
