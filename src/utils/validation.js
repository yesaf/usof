const checkValidId = (id) => +id > 0 && Number.isInteger(+id);

module.exports = {
  checkValidId
};
