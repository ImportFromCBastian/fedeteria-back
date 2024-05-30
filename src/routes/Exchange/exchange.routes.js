import { Router } from 'express'
import { ExchangeController } from '../../controller/Exchange/exchange.js'

const router = Router()

router.post('/', ExchangeController.create)

router.get('/suggestions/:DNI', ExchangeController.getExchangeSuggestionByDNI)

export default router
