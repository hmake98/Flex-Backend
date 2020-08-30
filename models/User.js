const mongoose = require('mongoose');

const { Schema } = mongoose;

// Schema
const User = new Schema(
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
    birthdate: {
      type: String,
    },
    phone: {
      type: Number,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

const user = mongoose.model('users', User);

module.exports = user;
