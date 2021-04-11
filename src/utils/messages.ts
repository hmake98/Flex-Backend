export const ENVIROMENT = {
    DEVELOPMENT: "development",
    STAGING: "staging",
    PRODUCTION: "production"
}

export const DATE_TYPE = {
    WEEK: "WEEK",
    MONTH: "MONTH",
    DAY: "DAY"
}

export const VALIDATION = {
    VALIDATION_ERROR: 'Validation Error Occured',
    PASSWORD_LENGTH: 'Minimum password length required is 8',
    CONFIRM_MISSMATCH: 'Password confirmation is incorrect',
    USER_NOT_EXISTS: 'User does not exists',
}

export const ERRORS = {
    MISSING_HEADER: 'Authrization Header Missing',
    UNAUTH_ACCESS: 'Unauthorized Access',
}

export const USER = {
    ALREADY_REGISTERED: 'User is already registered',
    NOT_FOUND: 'User does not exists',
    FOUND: 'User found',
    DELETED: 'User deleted',
    PASSWORD_INCORRECT: 'Invalid Password'
}

export const POST = {
    DELETED: 'Post successfully deleted'
}

export const PROFILE = {
    EXCLUDE: ["createdAt", "updatedAt", "user_id", "id"],
    NOT_FOUND: 'User profile not found',
    FOUND: 'User profile found',
    ADDED: 'Details added to user profile',
    DELETED: 'Profile deleted',
}
