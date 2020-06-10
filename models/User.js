const mongoose = require('mongoose');

const { Schema } = mongoose;

// Schema
const userSchema = new Schema(
  {
    userName: {
      type: String,
    },
    email: {
      type: String,
    },
    password: {
      type: String,
    },
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    profilePic: {
      type: String,
    },
    deleteDate: {
      type: Date,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

const users = mongoose.model('users', userSchema);

module.exports = users;
