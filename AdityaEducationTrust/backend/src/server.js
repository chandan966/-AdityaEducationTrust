import 'dotenv/config';

import cors from 'cors';
import express from 'express';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';

import { query } from './config/db.js';
import { errorHandler, notFound } from './middleware/errors.js';
import adminRoutes from './routes/admin.routes.js';
import authRoutes from './routes/auth.routes.js';
import collegesRoutes from './routes/colleges.routes.js';
import {
  noticesRouter,
  eventsRouter,
  enquiriesRouter,
  applicationsRouter
} from './routes/content.routes.js';

if (!process.env.JWT_SECRET || process.env.JWT_SECRET.length < 32) {
  console.warn(
    'WARNING: Set JWT_SECRET to a unique random value of at least 32 characters in backend/.env before use.',
  );
}

const app = express();
const frontendOrigins = (process.env.FRONTEND_ORIGIN || 'http://localhost:4200')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);

app.disable('x-powered-by');
app.use(helmet());
app.use(
  cors({
    origin: frontendOrigins,
    methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  }),
);
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: false, limit: '100kb' }));

app.use(
  '/api/auth',
  rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 15,
    standardHeaders: 'draft-7',
    legacyHeaders: false,
    message: { message: 'Too many sign-in attempts. Please try again later.' },
  }),
);
app.use(
  '/api/enquiries',
  rateLimit({
    windowMs: 60 * 60 * 1000,
    limit: 10,
    standardHeaders: 'draft-7',
    legacyHeaders: false,
    message: {
      message: 'Too many enquiries from this connection. Please try again later.',
    },
  }),
);

app.get('/api/health', async (req, res) => {
  try {
    await query('SELECT 1');
    res.json({
      status: 'ok',
      database: 'connected',
      service: 'Aditya Education Trust API',
    });
  } catch (error) {
    console.error('Database health check failed:', error.message);
    res.status(503).json({
      status: 'degraded',
      database: 'unavailable',
      service: 'Aditya Education Trust API',
    });
  }
});

app.use('/api/auth', authRoutes);
app.use('/api/colleges', collegesRoutes);
app.use('/api/notices', noticesRouter);
app.use('/api/events', eventsRouter);
app.use('/api/enquiries', enquiriesRouter);
app.use('/api/applications', applicationsRouter);
app.use('/api/admin', adminRoutes);
app.use('/api/notices', noticesRouter);
app.use('/api/events', eventsRouter);
app.use('/api/enquiries', enquiriesRouter);

app.use(notFound);
app.use(errorHandler);

const port = Number(process.env.PORT) || 3001;
const server = app.listen(port, () => {
  console.log(`Aditya Education Trust API listening on http://localhost:${port}`);
});

server.on('error', (error) => {
  console.error('Failed to start the API server:', error.message);
  process.exitCode = 1;
});
