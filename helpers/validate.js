const {
    validationResult
} = require('express-validator');
const {
    ERROR422
} = require('../constants/comman');

const validationHandler = (req, res, next) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
        return res.status(ERROR422).json({
            errors: result.array(),
        });
    }
    return next();
};

module.exports = {
    validationHandler: validationHandler,
};