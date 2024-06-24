import { Router } from 'express'
import { ExchangeController } from '../../controller/Exchange/exchange.js'

const router = Router()

router.post('/', ExchangeController.create)

router.get('/:DNI', ExchangeController.getSuggestionByDNI)
router.get('/all/:DNI', ExchangeController.getEveryExchangeByDNI)

router.get('/suggestions/dni/:DNI', ExchangeController.getExchangeSuggestionByDNI)

router.get('/suggestion/:id', ExchangeController.getSuggestionProductById)

router.get('/product/:id', ExchangeController.getExchangeProductById)

router.get('/state/pending', ExchangeController.getPendingExchange)

router.get('/suggestion/product/:id', ExchangeController.getMainProductById)

router.get('/given/:DNI', ExchangeController.getSentSuggestionByDNI)

router.post('/suggestion', ExchangeController.createPendingExchange)

router.delete('/suggestion/:id', ExchangeController.deleteSuggestion)

router.get('/accepteds/:DNI', ExchangeController.getAcceptedExchanges)

router.get('/availableTimes/:selectedSucursal/:day', ExchangeController.getAvailableTimes)

router.post('/details/:id', ExchangeController.createExchangeDetailsById)
export default router
