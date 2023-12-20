const Joi = require("joi");
const User = require("../../models/users");
const bcryptjs = require("bcryptjs");

const login = async (req, res) => {
  // Validae user input
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).max(30).required(),
  });

  const result = schema.validate(req.body);
  if (result.error) {
    return res.send({ status: 400, message: result.error.details[0].message });
  }
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email: email });
    if (user) {
      const correctPassword = await bcryptjs.compare(password, user.password);

      if (correctPassword) {
        const token = await user.generateAuthToken();
        res.send({ status: 201, message: "Login Successful", token: token });
      } else {
        return res.send({ status: 409, message: "Incorrect password" });
      }
    } else {
      res.send({ status: 404, message: "Please check email" });
    }
  } catch (error) {
    res.send({ status: 500, message: "Internal server error" });
  }
};

module.exports = login;
