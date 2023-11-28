const ValidateUploadFileMiddleware = require('./ValidateUploadFileMiddleware');
const ValidateFieldsMiddleware = require('./ValidateFieldsMiddleware');

module.exports = {
    ...ValidateUploadFileMiddleware,
    ...ValidateFieldsMiddleware,
}