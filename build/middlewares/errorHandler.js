"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const baseError_1 = __importDefault(require("../errors/baseError"));
const errorHandler = (err, req, res, next) => {
    if (err instanceof baseError_1.default) {
        res.status(err.statusCode).json(err.toObject());
    }
    else {
        res.status(500).json({
            name: "InternalServerError",
            error: err,
            message: "Internal Server Error",
            stack: err.stack
        });
    }
};
exports.default = errorHandler;
