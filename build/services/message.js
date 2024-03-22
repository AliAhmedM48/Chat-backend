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
Object.defineProperty(exports, "__esModule", { value: true });
class MessageService {
    constructor(repository) {
        this.repository = repository;
        this.createMessage = (loggedUser_id, body, seenIds, image, chatId) => __awaiter(this, void 0, void 0, function* () {
            return yield this.repository.create(loggedUser_id, chatId, body, seenIds, image);
        });
        this.getChatMessages = (chatId, loggedUser_id) => __awaiter(this, void 0, void 0, function* () {
            const messages = yield this.repository.findAllByChatId(chatId);
            // Update the seenIds array for each message
            for (const message of messages) {
                if (!message.seenIds.includes(loggedUser_id)) {
                    yield this.repository.updateSeenIds(message, loggedUser_id);
                }
            }
            return messages;
        });
        this.updateMessage = (messageId, loggedUser_id, update) => __awaiter(this, void 0, void 0, function* () {
            return yield this.repository.update(messageId, loggedUser_id, update);
        });
        // ^ Delete messages by IDs
        this.deleteMessages = (messageId, loggedUser_id) => __awaiter(this, void 0, void 0, function* () {
            const id = messageId;
            const idsToDelete = Array.isArray(id) ? id : [id];
            return yield this.repository.deleteMany(idsToDelete, loggedUser_id);
        });
    }
}
exports.default = MessageService;
