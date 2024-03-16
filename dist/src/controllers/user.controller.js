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
const user_model_1 = require("../models/user.model");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class UserController {
    create(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            //#region 
            try {
                const { firstName, lastName, email, password, avatar, isOnline } = req.body;
                const hashedPassword = yield bcryptjs_1.default.hash(password, 7);
                const user = yield user_model_1.User.create({ firstName, lastName, email, password: hashedPassword, avatar, isOnline });
                res.status(201).json({ success: true, data: user });
            }
            catch (error) {
                next(error);
            }
            //#endregion
        });
    }
    findAll(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            //#region 
            try {
                const users = yield user_model_1.User.find();
                res.status(200).json({ success: true, data: users });
            }
            catch (error) {
                next(error);
            }
            //#endregion
        });
    }
    findOne(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            //#region 
            try {
                const { id } = req.params;
                const user = yield user_model_1.User.findById(id);
                res.status(200).json({ success: true, data: user });
            }
            catch (error) {
                next(error);
            }
            //#endregion
        });
    }
    update(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            //#region 
            try {
                const { id } = req.params;
                const { firstName, lastName, email, password, avatar, isOnline } = req.body;
                const hashedPassword = yield bcryptjs_1.default.hash(password, 7);
                const user = yield user_model_1.User.findByIdAndUpdate(id, { firstName, lastName, email, passwordHash: hashedPassword, avatar, isOnline }, { new: true });
                res.status(200).json({ success: true, data: user });
            }
            catch (error) {
                next(error);
            }
            //#endregion
        });
    }
    delete(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            //#region 
            try {
                const { id } = req.params;
                const user = yield user_model_1.User.findByIdAndDelete(id);
                res.status(200).json({ success: true, data: user });
            }
            catch (error) {
                next(error);
            }
            //#endregion
        });
    }
    login(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            //#region 
            try {
                const { email, password } = req.body;
                const user = yield user_model_1.User.findOne({ email });
                if (!user) {
                    res.status(404).json({ success: false, error: 'User not found' });
                    return;
                }
                const isMatch = yield bcryptjs_1.default.compare(password, user.password);
                if (!isMatch) {
                    res.status(401).json({ success: false, error: 'Invalid password' });
                    return;
                }
                const token = jsonwebtoken_1.default.sign({ userId: user._id }, `${process.env.JWT_SECRET_KEY}`, { expiresIn: process.env.JWT_EXPIRES_IN });
                res.status(200).json({ success: true, token });
                res.status(200).json({ success: true, data: user });
            }
            catch (error) {
                next(error);
            }
            //#endregion
        });
    }
}
exports.UserController = UserController;
