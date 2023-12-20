const getUserData = async (req, res) => {
  if (req.user) {
    res.send({ status: 201, user: req.user });
  } else {
    res.send({ status: 403 });
  }
};

module.exports = getUserData;
