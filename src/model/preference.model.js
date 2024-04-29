import { Preference } from 'mercadopago'
import config from '../settings/settings.js'
export class PreferenceModel {
  static async createPreference(client, preferencePrice = 2500) {
    const preference = new Preference(client)
    const preferenceOptions = PreferenceModel.preferenceOptions(preferencePrice)
    return await preference
      .create(preferenceOptions)
      .then(response => {
        return {
          id: response.id,
        }
      })
      .catch(error => {
        return {
          errorMessage: error,
        }
      })
  }

  static preferenceOptions(preferencePrice) {
    return {
      body: {
        payment_methods: {
          excluded_payment_methods: [
            {
              id: 'argencard',
            },
            {
              id: 'cabal',
            },
            {
              id: 'cmr',
            },
            {
              id: 'cencosud',
            },
            {
              id: 'cordobesa',
            },
            {
              id: 'diners',
            },
            {
              id: 'naranja',
            },
            {
              id: 'tarshop',
            },
            {
              id: 'debcabal',
            },
            {
              id: 'maestro',
            },
          ],
          excluded_payment_types: [
            {
              id: 'ticket',
            },
          ],
          installments: 1,
        },
        //front implementation of item
        items: [
          {
            title: 'Promocionar Publicacion',
            quantity: 1,
            unit_price: preferencePrice,
          },
        ],
        back_urls: {
          success: `${config.BASE_URL}/success`,
          failure: `${config.BASE_URL}/failure`,
          pending: `${config.BASE_URL}/pending`,
        },
        notification_url: `${config.SECURE_ROUTE}/webhook`,
      },
    }
  }
}
