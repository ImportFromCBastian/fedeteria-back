import express from 'express';
import morgan from 'morgan';
import { corsMiddleware } from './middleware/cors.js';
import config from './settings/settings.js';
import preferenceRoutes from './routes/preference.routes.js';
import paymentRoutes from './routes/payment.routes.js';
import mailingRouters from './routes/mailing.routes.js';

const app = express();

const PORT = config.PORT;

app.disable('x-powered-by'); // Disable the X-Powered-By header

app.use(express.json()); // Parse incoming requests with JSON payloads

app.use(corsMiddleware()); // Enable CORS

app.use(morgan('dev')); // Log HTTP requests

app.use(preferenceRoutes);

app.use('/process_payment', paymentRoutes);

app.use('/mailing', mailingRouters);

app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`);
});
