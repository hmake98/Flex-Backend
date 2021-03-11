"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PROFILE = exports.USER = exports.ERRORS = exports.VALIDATION = exports.DATE_TYPE = exports.ENVIROMENT = void 0;
exports.ENVIROMENT = {
    DEVELOPMENT: "development",
    STAGING: "staging",
    PRODUCTION: "production"
};
exports.DATE_TYPE = {
    WEEK: "WEEK",
    MONTH: "MONTH",
    DAY: "DAY"
};
exports.VALIDATION = {
    VALIDATION_ERROR: 'Validation Error Occured',
    PASSWORD_LENGTH: 'Minimum password length required is 8',
    CONFIRM_MISSMATCH: 'Password confirmation is incorrect',
    USER_NOT_EXISTS: 'User does not exists',
};
exports.ERRORS = {
    MISSING_HEADER: 'Authrization Header Missing',
    UNAUTH_ACCESS: 'Unauthorized Access',
};
exports.USER = {
    ALREADY_REGISTERED: 'User is already registered',
    NOT_FOUND: 'User does not exists',
    FOUND: 'User found',
    DELETED: 'User deleted',
    PASSWORD_INCORRECT: 'Invalid Password'
};
exports.PROFILE = {
    EXCLUDE: ["createdAt", "updatedAt", "user_id", "id"],
    NOT_FOUND: 'User profile not found',
    FOUND: 'User profile found',
    ADDED: 'Details added to user profile',
    DELETED: 'Profile deleted',
};
//# sourceMappingURL=messages.js.map