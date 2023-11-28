const { ResponseErrorHelper } = require("../helpers");

const validateFileUpload = (req, res, next) => {
    if (!req.files) {
        return ResponseErrorHelper.handle400({ res, msg: 'No hay archivos que subir - validateFileUpload' })
    }
    next();
}

module.exports = {
    validateFileUpload,
}