import express from 'express'
import morgan from 'morgan'
import { corsMiddleware } from './middleware/cors.js'
import config from './settings/settings.js'
import preferenceRoutes from './routes/preference.routes.js'
import paymentRoutes from './routes/payment.routes.js'
import mailingRoutes from './routes/mail/mailing.routes.js'
import userRoutes from './routes/user/user.routes.js'
import publicationRouter from './routes/publication/publication.routes.js'
import fotoRouter from './routes/publication/foto.routes.js'
import detalleRouter from './routes/VerDetallePub/verdetallepub.routes.js'
import perfilRouter from './routes/VerPerfil/verperfi.routes.js'
import publicacionRouter from './routes/ListadoPubRoutes/listadopub.routes.js'
import sucursalRouter from './routes/Sucursal/sucursal.routes.js'

const app = express()

const PORT = config.PORT ?? 3000
app.disable('x-powered-by') // Disable the X-Powered-By header

app.use(express.json()) // Parse incoming requests with JSON payloads

app.use(corsMiddleware()) // Enable CORS

app.use(morgan('dev')) // Log HTTP requests

app.use(preferenceRoutes)

app.use('/process_payment', paymentRoutes)

app.use('/mailing', mailingRoutes)

app.use('/user', userRoutes)

app.use('/publication', publicationRouter)

app.use('/add-foto', fotoRouter)

app.use('/ver_detalles', detalleRouter)

app.use('/mi_perfil', perfilRouter)

app.use('/publicaciones', publicacionRouter)

app.use('/sucursal', sucursalRouter)

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})
