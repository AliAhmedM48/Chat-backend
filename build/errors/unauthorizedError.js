"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const baseError_1 = __importDefault(require("./baseError"));
const httpStatusCode_1 = __importDefault(require("./httpStatusCode"));
class UnauthorizedError extends baseError_1.default {
    constructor(message = "Unauthorized") {
        super("Unauthorized", httpStatusCode_1.default.UNAUTHORIZED, true, message);
    }
}
exports.default = UnauthorizedError;
