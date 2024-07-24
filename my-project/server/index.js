import express from 'express';
import process from 'process';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import registerRoute from './routes/register';
import sendNotificationRoute from './utils/notification';
import notification from './utils/notification';
import User from './models/User';
import {
  validateRegisterInput,
  validateSendNotificationInput,
} from './utils/validation';

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

// set up express middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(cookieParser());
app.use('/register', registerRoute);
app.use('/send-notification', sendNotificationRoute);

// set up routes
app.post('/register', async (req, res) => {
  try {
    const { error } = validateRegisterInput(req.body);
    if (error) {
      return res.status(400).send(error.details);
    }
    const { name, email, password, role } = req.body;
    const user = new User({ name, email, password, role });
    await user.save();
    res.send(`User created successfully!`);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error creating user');
  }
});

app.post('/send-notification', async (req, res) => {
  try {
    const { error } = validateSendNotificationInput(req.body);
    if (error) {
      return res.status(400).send(error.details);
    }
    const { userId, message } = req.body;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send('User not found');
    }
    await notification.sendNotification(user, message);
    res.send(`Notification sent to ${user.email}`);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error sending notification');
  }
});

// Error handling middleware
app.use((error, req, res, next) => {
  console.error(error);
  res.status(500).send('Internal Server Error');
  next();
});

export { app };
