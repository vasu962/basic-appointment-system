// authentication function

import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { User } from '../models/user';

const secretKey = 'secretkey';

const authenticate = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error('Invalid email or password');
  }
  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) {
    throw new Error('Invalid email or password');
  }
  const token = jwt.sign({ userId: user._id }, secretKey, { expiresIn: '1h' });
  return token;
};

const register = async (name, email, phoneNumber, role, password) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({
    name,
    email,
    phoneNumber,
    role,
    password: hashedPassword,
  });
  await user.save();
  return user;
};

export { authenticate, register };
