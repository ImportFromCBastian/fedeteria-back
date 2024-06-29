import { saleSchema } from './saleSchema.js'
export const saleValidator = object => {
  return saleSchema.safeParse(object)
}
