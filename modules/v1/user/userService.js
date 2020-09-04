const User = require('../../../models/User');

const userService = {};

userService.createUser = (data) => {
  const user = new User(data);
  return user.save();
};

userService.updateUser = (id, data) => {
  return User.findOneAndUpdate({ _id: id }, { $set: data }, { new: true });
};

userService.getUserByUsername = (userName) => {
  return User.findOne({ userName });
}

userService.getUserByUserId = (id) => {
  return User.findById(id);
}

module.exports = userService;
