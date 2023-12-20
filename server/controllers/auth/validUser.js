const validUser = async (req, res) => {
  if (req.user) {
    return res.send({ status: 201, message: "Login Successful" });
  } else {
    return res.send({ status: 404, message: "Invalid token" });
  }
};

module.exports = validUser;
