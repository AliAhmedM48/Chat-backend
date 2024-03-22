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
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const httpStatusCode_1 = __importDefault(require("../errors/httpStatusCode"));
const notFoundError_1 = __importDefault(require("../errors/notFoundError"));
class UserController {
    constructor(service) {
        this.service = service;
        this.getAllUsers = (0, express_async_handler_1.default)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const id = req.loggedUser._id;
            const users = yield this.service.getAllUsers(id);
            res.status(httpStatusCode_1.default.OK).json({ success: true, data: users });
        }));
        this.getOneUser = (0, express_async_handler_1.default)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const user = yield this.service.getOneUser(id);
            if (!user)
                return next(new notFoundError_1.default("User not found..."));
            res.status(httpStatusCode_1.default.OK).json({ success: true, data: user });
        }));
        this.updateUser = (0, express_async_handler_1.default)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            if (Object.keys(req.body).length === 0) {
                return res.status(httpStatusCode_1.default.NOT_MODIFIED).end();
            }
            const id = req.loggedUser._id; // logged user
            const { firstName, lastName, email, password, avatar, isOnline } = req.body;
            const user = yield this.service.updateUser(id, firstName, lastName, email, password, avatar, isOnline);
            if (!user)
                return next(new notFoundError_1.default("User not found"));
            res.status(httpStatusCode_1.default.OK).json({ success: true, data: user });
        }));
        this.deleteUser = (0, express_async_handler_1.default)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const id = req.loggedUser._id; // logged user
            const user = yield this.service.deleteUser(id);
            res.status(httpStatusCode_1.default.NO_CONTENT).end();
            // res.status(HttpStatusCode.OK).json({ success: true, data: user });
        }));
    }
}
exports.default = UserController;
