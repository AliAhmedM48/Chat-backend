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
const chat_1 = __importDefault(require("../../models/chat"));
class ChatMongoRepository {
    constructor() {
        this.create = (users, isGroup, name, lastMessage) => __awaiter(this, void 0, void 0, function* () {
            return yield chat_1.default.create({ name, users, lastMessage, isGroup });
        });
        this.findByChatId = (chatId) => __awaiter(this, void 0, void 0, function* () {
            return yield chat_1.default.find({ _id: chatId }).populate("users");
        });
        this.findOne = (chatId) => __awaiter(this, void 0, void 0, function* () {
            return yield chat_1.default.findOne({ _id: chatId }).populate("users");
        });
        this.findByUserId = (userId) => __awaiter(this, void 0, void 0, function* () {
            return yield chat_1.default.find({ users: userId }).populate("users");
        });
        this.findDirectChatBetweenUsers = (loggedUser_id, receiverId) => __awaiter(this, void 0, void 0, function* () {
            return yield chat_1.default.findOne({
                isGroup: false,
                users: { $all: [loggedUser_id, receiverId] },
            });
        });
        this.findChatByIdAndUser = (chatId, loggedUser_id) => __awaiter(this, void 0, void 0, function* () {
            return yield chat_1.default.findOne({
                _id: chatId,
                users: { $in: [loggedUser_id] },
            });
        });
        this.findAllByUserId = (id) => __awaiter(this, void 0, void 0, function* () {
            return yield chat_1.default.find({ users: id }).populate("users");
        });
        this.update = (chatId, update) => __awaiter(this, void 0, void 0, function* () {
            return yield chat_1.default.findByIdAndUpdate(chatId, update, { new: true }).populate("users");
        });
        this.deleteUser = (loggedUser_id, chatId) => __awaiter(this, void 0, void 0, function* () {
            return yield chat_1.default.findByIdAndDelete(chatId);
        });
    }
}
exports.default = ChatMongoRepository;
