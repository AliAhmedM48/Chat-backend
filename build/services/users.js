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
class UserService {
    constructor(repository) {
        this.repository = repository;
        this.getAllUsers = (loggedUser) => __awaiter(this, void 0, void 0, function* () { return yield this.repository.findAll(loggedUser); });
        this.getOneUser = (id) => __awaiter(this, void 0, void 0, function* () { return yield this.repository.findOne(id); });
        this.updateUser = (id, firstName, lastName, email, password, avatar, isOnline) => __awaiter(this, void 0, void 0, function* () {
            if (password) {
                password = yield bcryptjs_1.default.hash(password, 7);
            }
            return yield this.repository.update(id, firstName, lastName, email, password, avatar, isOnline);
        });
        this.deleteUser = (id) => __awaiter(this, void 0, void 0, function* () { return yield this.repository.delete(id); });
    }
}
exports.default = UserService;
