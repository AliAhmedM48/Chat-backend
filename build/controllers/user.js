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
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const user_1 = require("../models/user");
const notFoundError_1 = require("../errors/notFoundError");
const httpStatusCode_1 = require("../errors/httpStatusCode");
class UserController {
    constructor() {
        this.getAllUsers = (0, express_async_handler_1.default)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const users = yield user_1.User.find();
            res.status(httpStatusCode_1.HttpStatusCode.OK).json({ success: true, data: users });
        }));
        this.getOneUser = (0, express_async_handler_1.default)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const user = yield user_1.User.findById(id);
            if (!user) {
                return next(new notFoundError_1.NotFoundError("User not found"));
            }
            res.status(httpStatusCode_1.HttpStatusCode.OK).json({ success: true, data: user });
        }));
        this.updateUser = (0, express_async_handler_1.default)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            if (Object.keys(req.body).length === 0) {
                res.status(httpStatusCode_1.HttpStatusCode.NOT_MODIFIED).end();
                return;
            }
            const id = req.loggedUser._id; // logged user
            const { firstName, lastName, email, password, avatar } = req.body;
            let hashedPassword = null;
            if (password)
                hashedPassword = yield bcryptjs_1.default.hash(password, 7);
            // * Update logged user data
            const user = yield user_1.User.findByIdAndUpdate(id, { firstName, lastName, email, avatar, passwordHash: hashedPassword || password }, { new: true });
            res.status(httpStatusCode_1.HttpStatusCode.OK).json({ success: true, data: user });
        }));
        this.deleteUser = (0, express_async_handler_1.default)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const id = req.loggedUser._id; // logged user
            const user = yield user_1.User.findByIdAndDelete(id);
            res.status(httpStatusCode_1.HttpStatusCode.NO_CONTENT).json({ success: true, data: user });
        }));
    }
}
exports.UserController = UserController;
