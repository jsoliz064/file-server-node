const { validationResult } = require('express-validator');
const { ResponseErrorHelper } = require("../helpers");

const validateFields = (req, res, next) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const errorMessages = errors.array().map(error => error.msg);
        return ResponseErrorHelper.handle400({ res, msg: errorMessages })
    }

    next();
}

module.exports = {
    validateFields,
}

