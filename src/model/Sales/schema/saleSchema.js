import * as z from 'zod'

export const saleSchema = z.object({
  pago: z.string(),
  precio: z.coerce.number(),
  dniCliente: z.coerce.number().positive(),
  dniEmpleado: z.coerce.number().positive()
})
