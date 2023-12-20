const User = require("../../models/users");
const Joi = require("joi");
const bcryptjs = require("bcryptjs");


const register = async (req, res) => {
  // Validate user input
  const schema = Joi.object({
    fname: Joi.string().required(),
    lname: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).max(30).required(),
    cpassword: Joi.string().min(6).max(30).required(),
  });
  const result = schema.validate(req.body);
  if (result.error) {
    return res.send({ status: 400, message: result.error.details[0].message });
  }

  const { fname, lname, email, password, cpassword } = req.body;
  if (password !== cpassword) {
    return res.send({
      status: 400,
      message: "Password and confirm password must be same",
    });
  }

  try {
    const preUser = await User.findOne({ email: email });
    if (preUser) {
      res.send({
        status: 409,
        message: "Email already registered",
      });
    } else {
      const newUser = new User({
        fname,
        lname,
        email,
        password,
      });

      // Register new user (Save new details)
      await newUser.save();

      res.send({
        status: 201,
        message: "User registered successfully",
      });
    }
  } catch (err) {
    res.send({ status: 500, message: "Internal server error" });
    console.log(err.message);
  }
};

module.exports = register;