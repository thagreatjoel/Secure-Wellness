import mongoose from 'mongoose';
import { config } from './config.js';

export async function connectDB() {
  if (!config.mongoUri) throw new Error('MONGO_URI is missing');
  mongoose.set('strictQuery', true);
  await mongoose.connect(config.mongoUri, {
    serverSelectionTimeoutMS: 15000
  });
  console.log('Successfully Connected to MongoDB');
}

