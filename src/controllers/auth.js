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

module.exports.register = async (request, response) => {
  const { email, login, password, passwordConfirm } = request.body;

  if (!email || !login || !password || !passwordConfirm) {
    return response
      .status(409)
      .json({
        type: "error",
        msg: "All fields must be filled"
      });
  }

  if (password !== passwordConfirm) {
    return response
      .status(409)
      .json({
        type: "error",
        msg: "Password mismatch"
      });
  }

  if (await User.checkExistEmail(email)) {
    return response
      .status(409)
      .json({
        type: "error",
        msg: `This email "${email}" has already exist. Please choose another email`
      });
  }

  if (await User.checkExistLogin(login)) {
    return response
      .status(409)
      .json({
        type: "error",
        msg: `This login "${login}" is already taken. Please choose another login`
      });
  }

  const result = await User.createNewUser({ email, login, password });

  if (result.status === "ok") {
    return response
      .status(201)
      .json(result);

  }
  return response
    .status(409)
    .json({
      type: "error",
      msg: "Something wrong! Try later"
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
