"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseError = void 0;
class BaseError extends Error {
    constructor(name, statusCode, isOperational, message) {
        super(message);
        this.name = name;
        this.statusCode = statusCode;
        this.isOperational = isOperational;
        this.name = name;
        this.statusCode = statusCode;
        this.isOperational = isOperational;
        Object.setPrototypeOf(this, new.target.prototype);
        Error.captureStackTrace(this);
    }
    toObject() {
        return {
            name: this.name,
            statusCode: this.statusCode,
            isOperational: this.isOperational,
            message: this.message,
            stack: this.stack
        };
    }
}
exports.BaseError = BaseError;
