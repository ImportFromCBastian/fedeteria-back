import { z } from 'zod'
const exchangeSchema = z.object({
  mainPublication: z.number({
    invalid_type_error: 'Main publication must be valid'
  }),
  publicationList: z.array(z.number())
})

export const exchangeBodyValidator = ({ mainPublication, publicationList }) => {
  return exchangeSchema.safeParse({ mainPublication, publicationList })
}
