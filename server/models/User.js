import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    email: { type: String, unique: true, required: true, index: true },
    password_hash: { type: String, required: true }
  },
  { timestamps: { createdAt: 'created_at', updatedAt: false } }
);

export const User = mongoose.model('User', userSchema);

