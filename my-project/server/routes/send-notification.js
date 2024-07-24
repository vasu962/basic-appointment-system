// routes/send-notification.js
import express from 'express';
const router = express.Router();
import validation from '../utils/validation';
import { NotificationService } from '../utils/notificationService';

router.post('/', (req, res, next) => { // eslint-disable-line no-unused-vars
  const { recipient, message } = req.body;
  const isValid = validation.validateNotificationInput(recipient, message);
  if (!isValid) {
    return res.status(400).send({ error: 'Invalid input' });
  }

  // Send notification logic here (e.g. send an email or a push notification)
  // Assume we have a Notification service or a function to send a notification
  NotificationService.send(recipient, message, (err) => {
    if (err) {
      return res.status(500).send({ error: 'Failed to send notification' });
    }
    res.send({ message: 'Notification sent successfully' });
  });
});

export { router };
