import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import { connectDB } from './db.js';
import { config } from './config.js';
import authRoutes from './routes/auth.js';
import sessionRoutes from './routes/sessions.js';

const app = express();

app.use(helmet());
app.use(express.json({ limit: '1mb' }));
app.use(
  cors({
    origin: [config.frontendUrl, /localhost:\\d+$/],
    credentials: false
  })
);
app.use(morgan('dev'));

app.get('/health', (req, res) => res.json({ ok: true }));

app.use(authRoutes);
app.use(sessionRoutes);

connectDB()
  .then(() => app.listen(config.port, () => console.log(`✔ API on http://localhost:${config.port}`)))
  .catch((e) => {
    console.error('Failed to start server', e);
    process.exit(1);
  });

