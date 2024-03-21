"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnauthorizedError = void 0;
const baseError_1 = require("./baseError");
const httpStatusCode_1 = require("./httpStatusCode");
class UnauthorizedError extends baseError_1.BaseError {
    constructor(message = "Unauthorized") {
        super("Unauthorized", httpStatusCode_1.HttpStatusCode.UNAUTHORIZED, true, message);
    }
}
exports.UnauthorizedError = UnauthorizedError;
