import { Payment } from 'mercadopago'
import connection from '../settings/database.js'
//TODO: change description,payment method and payer from paymentBody argument
export class PaymentModel {
  static async createPayment(client, paymentBody) {
    const payment = new Payment(client)

    const result = await payment
      .create({
        body: {
          token: `${paymentBody.token}`,
          transaction_amount: paymentBody.transaction_amount,
          description: 'Promocionar Publicaicion',
          installments: paymentBody.installments,
          payment_method_id: `${paymentBody.payment_method_id}`,
          payer: {
            email: `${paymentBody.payer.email}`,
            identification: {
              type: `${paymentBody.payer.identification.type}`,
              number: `${paymentBody.payer.identification.number}`
            }
          }
        }
      })
      .catch(error => {
        console.error(error)
        return { error: error }
      })
    if (result.status !== 'approved') return null
    return result
  }

  static async insertData(payment, idPublicacion) {
    const query = `
    INSERT INTO Pagos
    (monto,desde,hasta,idPublicacion)
    VALUES 
    (?,NOW(),DATE_ADD(NOW(),INTERVAL 1 WEEK),?);`
    await connection.query(query, [payment.transaction_amount, idPublicacion])
  }
}
