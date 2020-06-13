const UserModel = require('../../../models/User');

const userService = {};

userService.createUser = (data) => {
  const user = new UserModel(data);
  return user.save();
};

userService.updateUser = (id, data) => {
  return UserModel.findOneAndUpdate({ _id: id }, { $set: data }, { new: true });
};

userService.getUserByUsername = (userName) => {
  return UserModel.findOne({ userName });
}

userService.getUserByUserId = (id) => {
  return UserModel.findById(id);
}

module.exports = userService;
