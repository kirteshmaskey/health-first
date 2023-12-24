const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true

  },
  dname: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  remark: {
    type: String,
  }
});

const Appointment = new mongoose.model("appointments", appointmentSchema);

module.exports = Appointment;