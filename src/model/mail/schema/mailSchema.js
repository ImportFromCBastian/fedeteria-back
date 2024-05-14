import { z } from 'zod'

const mailSchema = z.object({
  email: z
    .string({
      invalid_type_error: 'Email must be a string',
    })
    .email({
      message: 'Invalid email',
    }),
})

export const mailBodyValidator = object => {
  return mailSchema.safeParse(object)
}
