import mongoose from 'mongoose';

const sessionSchema = new mongoose.Schema(
  {
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', index: true, required: true },
    title: { type: String, default: '' },
    tags: { type: [String], default: [] },
    json_file_url: { type: String, default: '' },
    status: { type: String, enum: ['draft', 'published'], default: 'draft', index: true }
  },
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
);

sessionSchema.index({ status: 1, updated_at: -1 });

export const Session = mongoose.model('Session', sessionSchema);
