"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const baseError_1 = __importDefault(require("./baseError"));
const httpStatusCode_1 = __importDefault(require("./httpStatusCode"));
class BadRequestError extends baseError_1.default {
    constructor(message = "Bad Request") {
        super('Bad Request', httpStatusCode_1.default.BAD_REQUEST, true, message);
    }
}
exports.default = BadRequestError;
