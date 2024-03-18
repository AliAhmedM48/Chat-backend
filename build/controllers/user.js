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
exports.UserController = void 0;
const user_1 = require("../models/user");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const apiError_1 = require("../errors/apiError");
const notFoundError_1 = require("../errors/notFoundError");
class UserController {
    constructor() {
        this.getAllUsers = (0, express_async_handler_1.default)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const users = yield user_1.User.find();
            if (users.length === 0) {
                return next(new notFoundError_1.NotFoundError('Users not found'));
            }
            res.status(200).json({ success: true, data: users });
        }));
        this.getOneUser = (0, express_async_handler_1.default)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const user = yield user_1.User.findById(id);
            if (!user) {
                return next(new notFoundError_1.NotFoundError("User not found"));
            }
            res.status(200).json({ success: true, data: user });
        }));
        this.updateUser = (0, express_async_handler_1.default)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            console.log(id);
            const { firstName, lastName, email, password, avatar } = req.body;
            let hashedPassword = null;
            if (password)
                hashedPassword = yield bcryptjs_1.default.hash(password, 7);
            const user = yield user_1.User.findByIdAndUpdate(id, {
                firstName,
                lastName,
                email,
                passwordHash: hashedPassword || password,
                avatar,
            }, { new: true });
            console.log({ user });
            if (!user) {
                return next(new notFoundError_1.NotFoundError("User not found"));
            }
            res.status(200).json({ success: true, data: user });
        }));
        this.deleteUser = (0, express_async_handler_1.default)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const user = yield user_1.User.findByIdAndDelete(id);
            if (!user) {
                return next(new apiError_1.ApiError("User not found", 404));
            }
            res.status(200).json({ success: true, data: user });
        }));
    }
}
exports.UserController = UserController;
