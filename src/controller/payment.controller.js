import { mpc } from '../settings/mercadoPagoConfig.js'
import { PaymentModel } from '../model/payment.model.js'

const client = mpc

export class PaymentController {
  static async createPayment(req, res) {
    //destructure the body of the request
    const { body } = req
    const payment = await PaymentModel.createPayment(client, body)
    //send status code 201 for created payment
    res.status(201).json(payment)
  }
}
