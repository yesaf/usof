const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const keys = require("../config/keys");

module.exports.login = async (request, response) => {
  const { email, password } = request.body;

  const [user] = await User.findUserByEmail(email);

  if (!user) {
    return response
      .status(404)
      .json({
        type: "error",
        msg: "No such user exists"
      });
  }

  const passwordResult = bcrypt.compareSync(password, user.password);
  if (!passwordResult) {
    return response
      .status(401)
      .json({
        type: "error",
        msg: "Password mismatch"
      });
  }

  const token = jwt.sign({
    email: user.email,
    userId: user.id,
    iss: 'http://localhost:4000'
  }, keys.jwt, { expiresIn: 3600 });

  return response
    .json({
      token: `Bearer ${token}`
    });
};

module.exports.register = (request, response) => {
  response.json({
    register: "This is register router"
  });
};

module.exports.passwordReset = (request, response) => {
  response.json({
    passwordReset: "This is password reset router"
  });
};

module.exports.passwordResetToken = (request, response) => {
  response.json({
    passwordResetToken: "This is password reset token router"
  });
};
