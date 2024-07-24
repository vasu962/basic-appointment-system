// routes/register.js
import express from 'express';
const router = express.Router();
import { User } from '../models/User';
import validation from '../utils/validation';

router.post('/', (req, res, next) => { // eslint-disable-line no-unused-vars
  const { username, email, password } = req.body;
  const isValid = validation.validateRegisterInput(username, email, password);
  if (!isValid) {
    return res.status(400).send({ error: 'Invalid input' });
  }

  // Register user logic here (e.g. create a new user in a database)
  const user = { username, email, password };
  // Assume we have a User model or a function to create a new user
  User.create(user, (err) => {
    if (err) {
      return res.status(500).send({ error: 'Failed to create user' });
    }
    res.send({ message: 'User created successfully' });
  });
});

export { router }; 