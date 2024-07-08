import { mpc } from '../settings/mercadoPagoConfig.js'
import { PaymentModel } from '../model/payment.model.js'

const client = mpc

export class PaymentController {
  static async createPayment(req, res) {
    //destructure the body of the request
    const { body } = req
    const payment = await PaymentModel.createPayment(client, body)
    //send status code 201 for created payment
    if (payment === null) return res.status(400).json({ error: 'Bad Request' })

    await PaymentModel.insertData(payment, body.pubId)
    res.status(201).json(payment)
  }

  static async getAll(req, res) {
    const payments = await PaymentModel.getAll()
    res.status(200).json(payments)
  }
}
