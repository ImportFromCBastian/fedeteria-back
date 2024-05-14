import { z } from 'zod'

// Define un esquema para validar una foto
const fotoSchema = z.object({
  foto: z.any(), // Tipo de dato 'any' para la foto, puede ser cualquier cosa
})
// Función para validar una foto
const fotoValidator = foto => {
  // Valida el objeto de foto con el esquema definido
  return fotoSchema.safeParse(foto)
}

export default fotoValidator
