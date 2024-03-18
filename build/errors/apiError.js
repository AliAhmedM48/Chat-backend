"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiError = void 0;
const baseError_1 = require("./baseError");
const httpStatusCode_1 = require("./httpStatusCode");
class ApiError extends baseError_1.BaseError {
    constructor(name, statusCode = httpStatusCode_1.HttpStatusCode.INTERNAL_SERVER, isOpertional = true, message = 'Internal Server Error') {
        super(name, statusCode, isOpertional, message);
        this.name = name;
        this.statusCode = statusCode;
        this.isOpertional = isOpertional;
        this.message = message;
    }
}
exports.ApiError = ApiError;
