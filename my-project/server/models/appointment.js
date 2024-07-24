// appointment model

import mongoose from 'mongoose';

const appointmentSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  teacher: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  title: { type: String, required: true },
  description: { type: String },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  time: String,
  confirmed: Boolean,
});

const Appointment = mongoose.model('Appointment', appointmentSchema);

export { Appointment };
