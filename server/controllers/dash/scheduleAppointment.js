const Appointment = require("../../models/appointment");


const scheduleAppointment = async (req, res) => {
  try {
    const appointmentData = {
      ...req.body,
      user: req.userId,
    }
    const appointment = new Appointment (appointmentData);
    await appointment.save();
    res.send({status: 201, message: "Appointment Scheduled"});
  } catch (error) {
    res.status(400).send(error);
  }
}


module.exports = scheduleAppointment;