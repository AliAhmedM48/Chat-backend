"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const baseError_1 = __importDefault(require("./baseError"));
const httpStatusCode_1 = __importDefault(require("./httpStatusCode"));
class UnprocessableEntityError extends baseError_1.default {
    constructor(message = 'Unprocessable Entity') {
        super('Unprocessable Entity', httpStatusCode_1.default.UNPROCESSABLE_ENTITY, true, message);
    }
}
exports.default = UnprocessableEntityError;
