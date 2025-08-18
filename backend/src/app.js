import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.js';
import sessionRoutes from './routes/sessions.js';

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN?.split(',') || '*',
    credentials: false
  })
);

app.get('/', (_req, res) => res.json({ ok: true, service: 'Secure wellness' }));
app.use('/api', authRoutes);
app.use('/api', sessionRoutes);

app.use((req, res) => res.status(404).json({ error: '!Not found', path: req.path }));
app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(err.status || 500).json({ error: err.message || '!Server error' });
});
export default app;
