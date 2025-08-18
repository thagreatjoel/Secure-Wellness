import mongoose from 'mongoose';

const uri = process.env.MONGODB_URI;
if (!uri) {
  console.error('Missing MONGODB_URI');
  process.exit(1);
}
mongoose
  .connect(uri, { dbName: process.env.MONGODB_DB || 'secure-wellness' })
  .then(() => console.log('[MangoDB] connected'))
  .catch((e) => {
    console.error('[mongoDB] connection error', e);
    process.exit(1);
  });
