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
class AuthController {
    constructor(service) {
        this.service = service;
        this.register = (0, express_async_handler_1.default)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { firstName, lastName, email, password, avatar } = req.body;
            const user = yield this.service.register(firstName, lastName, email, password, avatar);
            res.status(httpStatusCode_1.default.CREATED).json({ success: true, data: user });
        }));
        this.login = (0, express_async_handler_1.default)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { email, password } = req.body;
            const result = yield this.service.login(email, password);
            if (!result) {
                return next(new notFoundError_1.default("Invalid password or email"));
            }
            res.status(httpStatusCode_1.default.OK).json({ success: true, data: result.user, token: result.token });
        }));
        this.logout = (0, express_async_handler_1.default)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const id = req.loggedUser._id; // logged user
            const user = yield this.service.logout(id); // isOnline = false
            res.status(httpStatusCode_1.default.NO_CONTENT).end();
        }));
    }
}
exports.default = AuthController;
