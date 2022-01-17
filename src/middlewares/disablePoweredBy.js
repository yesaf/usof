module.exports = (request, response, next) => {
  response.removeHeader('X-Powered-By');
  next();
}
