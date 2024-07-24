// utils/notification.js
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: 'smtp.ethereal.email',
  port: 587,
  auth: {
      user: 'hailie.schultz5@ethereal.email',
      pass: 'y7y1Dq6s8YF3AsJJmq'
  }
});

export const sendNotification = async (user, message) => {
  try {
    const mailOptions = {
      from: '"Vasu Kumar👻" <hailie.schultz5@ethereal.email>', // sender address
      to: "vasukumar962W@gmail.com", 
      subject: 'Appointment Notification',
      text: message,
    };

    await transporter.sendMail(mailOptions);
    console.log(`Notification sent to ${user.email}`);
  } catch (error) {
    console.error(`Error sending notification: ${error}`);
  }
};
