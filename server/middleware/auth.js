const jwt = require("jsonwebtoken");
const User = require("../models/users");
const secretkey = process.env.SECRETKEY;

const auth = async (req, res, next) => {
  try {
    const userToken = req.headers.usertoken;
    // console.log(userToken)

    // const token = jwt.verify(userToken, secretkey);
    let token;
    await jwt.verify(userToken, secretkey, (err, decoded) => {
      if (err) {
        return res.send({ status: 401, message: "Unauthorized" });
      }
      token = decoded;
    });

    if (token) {
      const user = await User.findOne({ _id: token._id });
      if (!user) {
        throw new Error("User not found");
      }
      req.user = user;
      req.userId = user._id;
      next();
    }
    return;
  } catch (error) {
    res.send({ status: 422, message: "Invalid token" });
  }
};

module.exports = auth;
