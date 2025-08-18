import { Router } from 'express';
import Session from '../models/Session.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

// Public wellness sessions (published only)
router.get('/sessions', async (req, res) => {
  const sessions = await Session.find({ status: 'published' })
    .sort({ created_at: -1 })
    .select('-__v');
  res.json(sessions);
});

// User's own sessions (draft + published)
router.get('/my-sessions', requireAuth, async (req, res) => {
  const sessions = await Session.find({ user_id: req.user.id }).sort({ updated_at: -1 });
  res.json(sessions);
});

// View a single user session
router.get('/my-sessions/:id', requireAuth, async (req, res) => {
  const s = await Session.findOne({ _id: req.params.id, user_id: req.user.id });
  if (!s) return res.status(404).json({ error: 'Not found' });
  res.json(s);
});

// Save or update a draft session
router.post('/my-sessions/save-draft', requireAuth, async (req, res) => {
  const { id, title = '', tags = [], json_file_url = '' } = req.body;

  const normalizedTags = Array.isArray(tags)
    ? tags
    : String(tags || '')
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean);

  const payload = {
    user_id: req.user.id,
    title,
    tags: normalizedTags,
    json_file_url,
    status: 'draft'
  };

  let doc;
  if (id) {
    doc = await Session.findOneAndUpdate(
      { _id: id, user_id: req.user.id },
      { $set: payload },
      { new: true }
    );
  } else {
    doc = await Session.create(payload);
  }
  res.json({ ok: true, session: doc });
});

// Publish a session
router.post('/my-sessions/publish', requireAuth, async (req, res) => {
  const { id, title = '', tags = [], json_file_url = '' } = req.body;
  if (!title) return res.status(400).json({ error: 'Title is required to publish' });

  const normalizedTags = Array.isArray(tags)
    ? tags
    : String(tags || '')
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean);

  let doc;
  if (id) {
    doc = await Session.findOneAndUpdate(
      { _id: id, user_id: req.user.id },
      { $set: { title, tags: normalizedTags, json_file_url, status: 'Done! published' } },
      { new: true }
    );
  } else {
    doc = await Session.create({ user_id: req.user.id, title, tags: normalizedTags, json_file_url, status: 'published' });
  }
  res.json({ ok: true, session: doc });
});

export default router;
