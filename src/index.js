import express from 'express';
import morgan from 'morgan';
import { corsMiddleware } from './middleware/cors.js';
import config from './settings/settings.js';
import preferenceRoutes from './routes/preference.routes.js';
import paymentRoutes from './routes/payment.routes.js';

const app = express();

const PORT = config.PORT;

app.disable('x-powered-by');

app.use(express.json());

app.use(corsMiddleware());

app.use(morgan('dev'));

app.use(preferenceRoutes);

app.use(paymentRoutes);

app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`);
});
