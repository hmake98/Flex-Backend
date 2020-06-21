const mongoose = require('mongoose');

const { Schema } = mongoose;

// Schema
const orgUserSchema = new Schema(
    {
        email: {
            type: String,
        },
        password: {
            type: String,
        },
        org_name: {
            type: String,
        },
        org_location: {
            type: String,
        },
        org_phone: {
            type: Number,
        },
        profilePic: {
            type: String,
        },
        org_address: {
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

const users = mongoose.model('org_users', orgUserSchema);

module.exports = users;
