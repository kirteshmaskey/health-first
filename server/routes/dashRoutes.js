const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const getUserData = require('../controllers/dash/getUserData');
const talk = require("../controllers/dash/talk");
const scheduleAppointment = require('../controllers/dash/scheduleAppointment');
const getAppointment = require('../controllers/dash/getAppointments');

router.get('/getuserdata', auth, getUserData);
router.post('/talk', auth, talk);
router.post('/schedule-appointment', auth, scheduleAppointment);
router.get('/get-appointments', auth, getAppointment);

module.exports = router;