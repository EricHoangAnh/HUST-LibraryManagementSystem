const User = require("../model/userModel");
const jwt = require("jsonwebtoken");
const { default: mongoose } = require("mongoose");

exports.createUser = (req, res) => {
  if (!req.body) {
    res.status(400).send({ message: "Request is empty !!!" });
    return;
  }
  try {
    const user = new User({
      account: req.body.account,
      userName: req.body.userName,
      password: req.body.password,
      dob: req.body.dob,
      gender: req.body.gender,
      email: req.body.email,
      phone: req.body.phone,
      address: req.body.address,
      role: 'user'
    });
    user
      .save(user)
      .then((data) => {
        res.status(200).send(data);
      })
      .catch((err) => {
        console.log(err);
      });
  } catch (err) {
    console.log(err);
  }
};
exports.updateUser = (req, res) => {};

exports.handleLogin = async (req, res) => {
  if (!req.body) {
    res.status(400).send({ message: "Request is empty !!!" });
    return;
  }
  const user = await User.findOne({
    account: req.body.account,
    password: req.body.password,
  }).exec();

  if (!user) {
    return res.status(401).json({
      title: "user or password incorrect",
      error: "invalid credntials",
    });
  }
  console.log("user: ", user);
  let token = jwt.sign({ userId: user._id }, "secretkey");
  return res.status(200).json({
    title: "login",
    token: token,
  });
};
exports.getAllUsers = async (req, res) => {
  await User.find()
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({ message: err || "Fail to get all users !!!" });
    });
};
exports.getUser = async (req, res) => {
  let token = req.headers.token;
  const decoded = jwt.verify(token, "secretkey");
  console.log("decoded: ", decoded);
  const user = await User.findOne({ _id: decoded.userId }).exec();
  if (!user) {
    return res.status(401).json({
      title: "unauthorized",
    });
  }
  return res.status(200).json({
    title: "User grabbed",
    user: user,
  });
};
