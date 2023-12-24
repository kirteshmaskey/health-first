const Appointment = require("../../models/appointment");

const getAppointment = async (req, res) => {
  try {
    const appointments = await Appointment.find({user: req.userId}, {_id:0, user:0});
    // console.log(appointments);
    res.send({status: 201, appointments: appointments});
  } catch (error) {
    res.status(400).send(error);
  }
}


module.exports = getAppointment;