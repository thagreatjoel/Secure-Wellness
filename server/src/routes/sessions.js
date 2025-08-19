import { Router } from 'express';
import { Session } from '../models/Session.js';
import { requireAuth } from '../middleware/auth.js';
import { isValidUrl } from '../utils/validate.js';

const router = Router();

// Public sessions
router.get('/sessions', async (req, res) => {
  const sessions = await Session.find({ status: 'published' })
    .sort({ updated_at: -1 })
    .select('-__v');
  res.json(sessions);
});

// Current user's sessions
router.get('/my-sessions', requireAuth, async (req, res) => {
  const sessions = await Session.find({ user_id: req.user.id }).sort({ updated_at: -1 });
  res.json(sessions);
});

// Single session 

router.get('/my-sessions/:id', requireAuth, async (req, res) => {
  const s = await Session.findOne({ _id: req.params.id, user_id: req.user.id });
  if (!s) return res.status(404).json({ message: 'Not found' });
  res.json(s);
});

// Save and draftss


router.post('/my-sessions/save-draft', requireAuth, async (req, res) => {
  const { id, title = '', tags = [], json_file_url = '' } = req.body || {};
  let payload = { title, tags, json_file_url, status: 'draft' };

  if (id) {
    const updated = await Session.findOneAndUpdate(
      { _id: id, user_id: req.user.id },
      { $set: payload },
      { new: true }
    );
    if (!updated) return res.status(404).json({ message: 'Not found' });
    return res.json({ message: 'Draft saved', session: updated });
  }

  const created = await Session.create({ user_id: req.user.id, ...payload });
  return res.status(201).json({ message: 'Draft created', session: created });
});

// Publish 

router.post('/my-sessions/publish', requireAuth, async (req, res) => {
  const { id, title = '', tags = [], json_file_url = '' } = req.body || {};

  if (!title.trim()) return res.status(400).json({ message: 'Title is required to publish' });
  if (!json_file_url || !isValidUrl(json_file_url))
    return res.status(400).json({ message: 'Valid JSON file URL is required' });

  const payload = { title, tags, json_file_url, status: 'published' };

  if (id) {
    const updated = await Session.findOneAndUpdate(
      { _id: id, user_id: req.user.id },
      { $set: payload },
      { new: true }
    );
    if (!updated) return res.status(404).json({ message: 'Not found' });
    return res.json({ message: 'Published', session: updated });
  }

  const created = await Session.create({ user_id: req.user.id, ...payload });
  return res.status(201).json({ message: 'Published', session: created });
});

export default router;
