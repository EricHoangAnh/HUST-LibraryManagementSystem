const User = require("../model/userModel");
const jwt = require("jsonwebtoken");

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

exports.handleLogin = (req, res) => {
  if (!req.body) {
    res.status(400).send({ message: "Request is empty !!!" });
    return;
  }
  const user = User.find({ account: req.body.account, password: req.body.password });

  if (!user) {
    return res.status(401).json({
      title: "user or password incorrect",
      error: "invalid credntials",
    });
  }
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
exports.getUser = async(req, res) => {
    let token = req.headers.token
    jwt.verify(token, 'secretkey', (err, decoded) => {
        if(err) return res.status(401).json({
            title: 'unauthorized'
        })
        console.log(decoded)
        const user = User.findOne({_id: decoded.userId}).exec()
        if(!user) {
            return res.status(401).json({
                title: 'unauthorized'
            })
        }
        return res.status(200).json({
            title:"User grabbed",
            user: user
        })

    })

}
