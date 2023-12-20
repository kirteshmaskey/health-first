const mongoose = require("mongoose");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const secretkey = process.env.SECRETKEY;

const userSchema = new mongoose.Schema({
  fname: {
    type: String,
    required: true,
  },
  lname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    minlength: 3,
    maxlength: 40,
  },
  password: {
    type: String,
    required: true,
  },
});

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcryptjs.hash(this.password, 10);
  }
  next();
});

userSchema.methods.generateAuthToken = async function (req, res) {
  try {
    let tkn = jwt.sign({ _id: this._id }, secretkey, {
      expiresIn: "1d",
    });
    return tkn;
  } catch (error) {
    res.send({ status: 422, message: error.message });
  }
};

const User = new mongoose.model("users", userSchema);

module.exports = User;
