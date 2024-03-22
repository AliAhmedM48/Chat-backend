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
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class AuthService {
    constructor(repository) {
        this.repository = repository;
        this.register = (firstName, lastName, email, password, avatar) => __awaiter(this, void 0, void 0, function* () {
            password = yield bcryptjs_1.default.hash(password, 7);
            return yield this.repository.create(firstName, lastName, email, password, avatar);
        });
        this.login = (email, password) => __awaiter(this, void 0, void 0, function* () {
            const user = yield this.repository.findOne(email);
            const isMatch = yield bcryptjs_1.default.compare(password, user ? user.password : "");
            if (!isMatch) {
                return null;
            } // Invalid password or email
            const token = jsonwebtoken_1.default.sign({ userId: user._id }, `${process.env.JWT_SECRET_KEY}`, { expiresIn: process.env.JWT_EXPIRES_IN });
            user.isOnline = true;
            user === null || user === void 0 ? void 0 : user.save();
            return { user, token };
        });
        this.logout = (id) => __awaiter(this, void 0, void 0, function* () {
            const isOnline = false;
            return yield this.repository.update(id, isOnline);
        });
    }
}
exports.default = AuthService;
