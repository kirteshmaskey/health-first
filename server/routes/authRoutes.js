const express = require("express");
const register = require("../controllers/auth/register");
const login = require("../controllers/auth/login");
const auth = require("../middleware/auth");
const validUser = require("../controllers/auth/validUser");
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/valid-user", auth, validUser);

module.exports = router;
