const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const getUserData = require('../controllers/dash/getUserData');
const talk = require("../controllers/dash/talk");

router.get('/getuserdata', auth, getUserData);
router.post('/talk', talk);

module.exports = router;