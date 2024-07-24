// routes/appointments.js
import express from 'express';
import { Appointment } from '../models/Appointment';
import { User } from '../models/User';
import { sendNotification } from '../utils/notification';

const router = express.Router();

// Middleware to check if user is logged in and is a student
const isLoggedInAndStudent = (req, res, next) => {
  if (!req.user || req.user.role !== 'student') {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  next();
};

// POST /appointments
router.post('/', isLoggedInAndStudent, async (req, res) => {
  try {
    const { date, time, teacherId } = req.body;
    const studentId = req.user._id;
    const appointment = new Appointment({ date, time, studentId, teacherId, status: 'pending' });
    await appointment.save();
    const teacher = await User.findById(teacherId);
    sendNotification(teacher, `New appointment request from ${req.user.name}`);
    res.json(appointment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating appointment' });
  }
});

// GET /appointments
router.get('/', isLoggedInAndStudent, async (req, res) => {
  try {
    const appointments = await Appointment.find({ studentId: req.user._id });
    res.json(appointments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error retrieving appointments' });
  }
});

// GET /appointments/:id
router.get('/:id', isLoggedInAndStudent, async (req, res) => {
  try {
    const appointmentId = req.params.id;
    const appointment = await Appointment.findById(appointmentId);
    if (!appointment || appointment.studentId.toString() !== req.user._id.toString()) {
      res.status(404).json({ message: 'Appointment not found' });
    } else {
      res.json(appointment);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error retrieving appointment' });
  }
});

// PUT /appointments/:id/confirm
router.put('/:id/confirm', async (req, res) => {
  try {
    const appointmentId = req.params.id;
    const appointment = await Appointment.findById(appointmentId);
    if (!appointment || appointment.status !== 'pending') {
      res.status(404).json({ message: 'Appointment not found or already confirmed' });
    } else {
      appointment.status = 'confirmed';
      await appointment.save();
      const student = await User.findById(appointment.studentId);
      sendNotification(student, `Your appointment with ${req.user.name} has been confirmed`);
      res.json(appointment);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error confirming appointment' });
  }
});

// PUT /appointments/:id/reject
router.put('/:id/reject', async (req, res) => {
  try {
    const appointmentId = req.params.id;
    const appointment = await Appointment.findById(appointmentId);
    if (!appointment || appointment.status !== 'pending') {
      res.status(404).json({ message: 'Appointment not found or already confirmed' });
    } else {
      appointment.status = 'rejected';
      await appointment.save();
      const student = await User.findById(appointment.studentId);
      sendNotification(student, `Your appointment with ${req.user.name} has been rejected`);
      res.json(appointment);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error rejecting appointment' });
  }
});

export default router;