import mongoose from 'mongoose';


const SessionSchema = new mongoose.Schema(
  {
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', index: true, required: true },
    title: { type: String, default: '' },
    tags: { type: [String], index: true, default: [] },
    json_file_url: { type: String, default: '' },
    status: { type: String, enum: ['draft', 'published'], index: true, default: 'draft' }
  },
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
);



export default mongoose.model('Session', SessionSchema);
