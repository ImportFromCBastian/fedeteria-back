import cors from 'cors';

export const corsMiddleware = () =>
	cors({
		origin: (origin, callback) => {
			const ACCEPTED_ORIGINS = [
				'http://localhost:3000',
				'http://localhost:8080',
				'http://localhost:5174/',
				'http://localhost:5174',
				'http://127.0.0.1:5174',
				'http://127.0.0.1:5174/',
				'http://127.0.0.1:5173',
			];
			if (ACCEPTED_ORIGINS.includes(origin)) return callback(null, true);

			if (!origin) return callback(null, true);

			return callback(new Error('Not allowed by CORS'));
		},
	});
