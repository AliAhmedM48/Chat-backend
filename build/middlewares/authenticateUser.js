"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkUserAuthentication = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const unauthorizedError_1 = require("../errors/unauthorizedError");
const user_1 = require("../models/user");
exports.checkUserAuthentication = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // 1) check if token exist
    let token;
    if (req.headers.authorization) {
        token = req.headers.authorization.split(" ")[1];
    }
    if (!token) {
        return next(new unauthorizedError_1.UnauthorizedError("you are not login please login to access this route"));
    }
    //2) verify token (no changes happens, expired token)
    if (!process.env.JWT_SECRET_KEY) {
        throw new Error("JWT_SECRET_KEY is not defined");
    }
    const secretKey = process.env.JWT_SECRET_KEY;
    const decoded = jsonwebtoken_1.default.verify(token, secretKey);
    // 3) Check if user exists
    const currentUser = yield user_1.User.findById(decoded.userId);
    if (!currentUser) {
        return next(new unauthorizedError_1.UnauthorizedError("The user that belong to this token does no longer exist"));
    }
    req.loggedUser = currentUser;
    next();
}));
