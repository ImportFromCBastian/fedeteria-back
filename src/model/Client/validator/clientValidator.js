import clientSchema from '../schema/clientSchema.js'

const clientValidator = client => {
  client.dni = parseInt(client.dni)

  client.notification = client.notification === 'true' ? 'si' : 'no'

  const result = clientSchema.safeParse(client)

  return result
}

export default clientValidator
