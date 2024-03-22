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
const message_1 = __importDefault(require("../../models/message"));
class MessageMongoRepository {
    constructor() {
        this.create = (senderId, chatId, body, seenIds, image) => __awaiter(this, void 0, void 0, function* () {
            return yield message_1.default.create({ senderId, chatId, body, seenIds, image });
        });
        this.findAllByChatId = (chatId) => __awaiter(this, void 0, void 0, function* () {
            return yield message_1.default.find({ chatId: chatId });
        });
        this.updateSeenIds = (message, loggedUser_id) => __awaiter(this, void 0, void 0, function* () {
            message.seenIds.push(loggedUser_id);
            message.save();
        });
        this.update = (messageId, loggedUser_id, update) => __awaiter(this, void 0, void 0, function* () {
            return yield message_1.default.findOneAndUpdate({ _id: messageId, senderId: loggedUser_id }, update, { new: true });
        });
        this.deleteMany = (messageIds, loggedUser_id) => __awaiter(this, void 0, void 0, function* () {
            return yield message_1.default.deleteMany({ _id: { $in: messageIds }, senderId: loggedUser_id });
        });
        this.deleteOne = (messageId, loggedUser_id) => __awaiter(this, void 0, void 0, function* () {
            return yield message_1.default.findOneAndDelete({ _id: messageId, senderId: loggedUser_id });
        });
    }
}
exports.default = MessageMongoRepository;
