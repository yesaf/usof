module.exports.login = (request, response) => {
  response.json({
    login: "This is login router"
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
