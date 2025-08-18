import mongoose from 'mongoose';






const UserSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true, index: true },
    password_hash: { type: String, required: true }
  },
  { timestamps: { createdAt: 'created_at', updatedAt: false } }
);








export default mongoose.model('User', UserSchema);
