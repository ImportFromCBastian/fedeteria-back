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

router.get('/', ExchangeController.getTrueques)

router.patch('/:id', ExchangeController.updateExchangeStatus)

router.get('/code/:codigo', ExchangeController.getByExchangeCode)

router.get('/suggestion/list/:id', ExchangeController.getProductListStateThree)

router.get('/clients/:id', ExchangeController.getClients)

router.get('/truequeLocal/:idLocal', ExchangeController.getIdExchangeByIdLocal)

router.get('/product/:id', ExchangeController.getExchangeMainProductById)

router.get('/exchange/:id', ExchangeController.getExchangeProductById)

router.get('/info/:id', ExchangeController.getExchangeInfoById)

router.get('/get/last20Exchanges', ExchangeController.getLast20Exchanges)

router.get('/toDelete/:id', ExchangeController.isInExchange)

router.get('/cantTrueque/get', ExchangeController.getCantTrueques)

export default router
