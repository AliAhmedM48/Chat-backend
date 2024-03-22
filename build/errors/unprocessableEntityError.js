"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnprocessableEntityError = void 0;
const baseError_1 = require("./baseError");
const httpStatusCode_1 = require("./httpStatusCode");
class UnprocessableEntityError extends baseError_1.BaseError {
    constructor(message = 'Unprocessable Entity') {
        super('Unprocessable Entity', httpStatusCode_1.HttpStatusCode.UNPROCESSABLE_ENTITY, true, message);
    }
}
exports.UnprocessableEntityError = UnprocessableEntityError;
