import { Router } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '../models/User.js';
import { config } from '../config.js';
import { isValidEmail } from '../utils/validate.js';

const router = Router();

router.post('/register', async (req, res) => {
  try {
    const { email, password } = req.body || {};
    if (!isValidEmail(email)) return res.status(400).json({ message: 'Invalid email' });
    if (!password || String(password).length < 8)
      return res.status(400).json({ message: 'Password must be at least 8 characters' });

    const existing = await User.findOne({ email: email.toLowerCase() });
    if (existing) return res.status(409).json({ message: 'Email already registered' });

    const password_hash = await bcrypt.hash(password, 12);
    const user = await User.create({ email: email.toLowerCase(), password_hash });

    const token = jwt.sign({ id: user._id, email: user.email }, config.jwtSecret, { expiresIn: config.jwtExpires });
    return res.status(201).json({ token, user: { id: user._id, email: user.email } });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: 'Server error' });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body || {};
    const user = await User.findOne({ email: String(email).toLowerCase() });
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });

    const ok = await bcrypt.compare(password || '', user.password_hash);
    if (!ok) return res.status(401).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id, email: user.email }, config.jwtSecret, { expiresIn: config.jwtExpires });
    return res.json({ token, user: { id: user._id, email: user.email } });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: 'Server error' });
  }
});

export default router;
