"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotFoundError = void 0;
const baseError_1 = require("./baseError");
const httpStatusCode_1 = require("./httpStatusCode");
class NotFoundError extends baseError_1.BaseError {
    constructor(message = '404 Not Found') {
        super('404 Not Found', httpStatusCode_1.HttpStatusCode.NOT_FOUND, true, message);
    }
}
exports.NotFoundError = NotFoundError;
