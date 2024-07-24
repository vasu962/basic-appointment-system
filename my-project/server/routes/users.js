// user routes
import express from 'express';
const router = express.Router();
import { authenticate, register } from '../utils/auth';
import { User } from '../models/User';

router.post('/register', async (req, res) => {
  try {
    const user = await register(req.body.name, req.body.email, req.body.phoneNumber, req.body.role, req.body.password);
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.post('/login', async (req, res) => {
  try {
    const token = await authenticate(req.body.email, req.body.password);
    res.status(200).json({ token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get('/users', async (req, res) => {
  const users = await User.find();
  res.status(200).json(users);
});

router.get('/users/:id', async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    res.status(404).json({ error: 'User not found' });
  } else {
    res.status(200).json(user);
  }
});

router.put