const utils = {};

utils.getTime = () => {
  const date = new Date();
  const time = date.getTime();
  return time;
};

module.exports = utils;