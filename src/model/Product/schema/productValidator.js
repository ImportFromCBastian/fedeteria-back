import { productSchema } from './productSchema.js'

export const productValidator = object => {
  return productSchema.safeParse(object)
}
