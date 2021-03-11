"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = require("mongoose");
const UserSchema = new mongoose_1.Schema({
    email: { type: String, required: true },
    userName: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    dateOfBirth: { type: String, required: true },
    isActive: { type: Boolean, required: true },
    socialId: { type: String, required: true },
    provider: { type: String, required: true },
    posts: { type: mongoose_1.Types.ObjectId, ref: 'posts' },
}, {
    timestamps: true
});
exports.User = mongoose_1.model('users', UserSchema);
//# sourceMappingURL=User.js.map