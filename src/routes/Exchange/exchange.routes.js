import { Router } from 'express'
import { ExchangeController } from '../../controller/Exchange/exchange.js'

const router = Router()

router.post('/', ExchangeController.create)

router.get('/:DNI', ExchangeController.getSuggestionByDNI)

router.get('/suggestions/dni/:DNI', ExchangeController.getExchangeSuggestionByDNI)

router.get('/suggestion/:id', ExchangeController.getSuggestionProductById)

router.get('/state/pending', ExchangeController.getPendingExchange)

router.get('/suggestion/product/:id', ExchangeController.getMainProductById)

router.post('/suggestion', ExchangeController.createPendingExchange)

router.delete('/suggestion/:id', ExchangeController.deleteSuggestion)

export default router
