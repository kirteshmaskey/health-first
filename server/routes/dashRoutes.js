const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const getUserData = require('../controllers/dash/getUserData');

router.get('/getuserdata', auth, getUserData);

module.exports = router;