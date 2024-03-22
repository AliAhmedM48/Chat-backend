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
exports.AuthController = void 0;
const user_1 = require("../models/user");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const notFoundError_1 = require("../errors/notFoundError");
const httpStatusCode_1 = require("../errors/httpStatusCode");
class AuthController {
    constructor() {
        this.register = (0, express_async_handler_1.default)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { firstName, lastName, email, password, avatar } = req.body;
            const hashedPassword = yield bcryptjs_1.default.hash(password, 7);
            const user = yield user_1.User.create({
                firstName,
                lastName,
                email,
                password: hashedPassword,
                avatar,
            });
            res.status(httpStatusCode_1.HttpStatusCode.CREATED).json({ success: true, data: user });
        }));
        this.login = (0, express_async_handler_1.default)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { email, password } = req.body;
            const user = yield user_1.User.findOne({ email });
            if (user)
                user.isOnline = true;
            user === null || user === void 0 ? void 0 : user.save();
            const isMatch = yield bcryptjs_1.default.compare(password, user ? user.password : "");
            if (!isMatch || !user) {
                return next(new notFoundError_1.NotFoundError("Invalid password or email"));
            }
            const token = jsonwebtoken_1.default.sign({ userId: user._id }, `${process.env.JWT_SECRET_KEY}`, { expiresIn: process.env.JWT_EXPIRES_IN });
            user.isOnline = true;
            user.password = "";
            res.status(httpStatusCode_1.HttpStatusCode.OK).json({ success: true, data: user, token });
        }));
        this.logout = (0, express_async_handler_1.default)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const id = req.loggedUser._id; // logged user
            const user = yield user_1.User.findByIdAndUpdate(id, { isOnline: false });
            res.status(httpStatusCode_1.HttpStatusCode.NO_CONTENT).end();
        }));
    }
}
exports.AuthController = AuthController;
