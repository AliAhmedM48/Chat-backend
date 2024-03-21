"use strict";
const baseError_1 = require("./baseError");
const httpStatusCode_1 = require("./httpStatusCode");
class BadRequestError extends baseError_1.BaseError {
    constructor(message = "Bad Request") {
        super('Bad Request', httpStatusCode_1.HttpStatusCode.BAD_REQUEST, true, message);
    }
}
module.exports = BadRequestError;
