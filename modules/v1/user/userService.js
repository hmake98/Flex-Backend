const NormalUserModel = require('../../../models/NormalUser');
const OrgUserModel = require('../../../models/OrgUser');
const normalusers = require('../../../models/NormalUser');
const { orgLogin } = require('./userController');

const userService = {};

userService.createNormalUser = (data) => {
  const user = new NormalUserModel(data);
  return user.save();
};

userService.createOrgUser = (data) => {
  const user = new OrgUserModel(data);
  return user.save();
};

userService.updateNormalUser = (id, data) => {
  return NormalUserModel.findOneAndUpdate({ _id: id }, { $set: data }, { new: true });
};

userService.updateOrgUser = (id, data) => {
  return OrgUserModel.findOneAndUpdate({ _id: id }, { $set: data }, { new: true });
};

userService.getNormalUserByUsername = (userName) => {
  return NormalUserModel.findOne({ userName });
}

userService.getOrgUserByEmail = (email) => {
  return OrgUserModel.findOne({ email });
}

userService.getNormalUserByUserId = (id) => {
  return NormalUserModel.findById(id);
}

userService.getOrgUserByUserId = (id) => {
  return OrgUserModel.findById(id);
}

module.exports = userService;
