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
// interface IChatController {
//   createGroup(req: Request, res: Response, next: NextFunction): Promise<void>;
//   getByUserIdOrByChatId(req: Request, res: Response, next: NextFunction): Promise<void>;
//   updateChat(req: Request, res: Response, next: NextFunction): Promise<void>;
//   deleteChat(req: Request, res: Response, next: NextFunction): Promise<void>;
// }
class ChatService {
    constructor(repository) {
        this.repository = repository;
        this.createGroup = (users, name, lastMessage) => __awaiter(this, void 0, void 0, function* () {
            return yield this.repository.create(users, true, name, lastMessage);
        });
        this.createPrivateChat = (loggedUser_id, receiverId, name, lastMessage) => __awaiter(this, void 0, void 0, function* () {
            const existingChat = yield this.repository.findDirectChatBetweenUsers(loggedUser_id, receiverId);
            if (!existingChat) {
                return yield this.repository.create([loggedUser_id, receiverId], false, name, lastMessage);
            }
            return existingChat;
        });
        this.getPreviousChat = (loggedUser_id, receiverId) => __awaiter(this, void 0, void 0, function* () {
            return yield this.repository.findDirectChatBetweenUsers(loggedUser_id, receiverId);
        });
        this.findChatByIdAndUser = (chatId, loggedUser_id) => __awaiter(this, void 0, void 0, function* () {
            return yield this.repository.findChatByIdAndUser(chatId, loggedUser_id);
        });
        this.findChatsByChatId = (chatId) => __awaiter(this, void 0, void 0, function* () {
            return this.repository.findByChatId(chatId);
        });
        this.findChatsByUserId = (userId) => __awaiter(this, void 0, void 0, function* () {
            return this.repository.findByUserId(userId);
        });
        this.updateLastMessage = (chatId, lastMessage) => __awaiter(this, void 0, void 0, function* () {
            return yield this.repository.update(chatId, { lastMessage });
        });
        this.updateChat = (chatId, update) => __awaiter(this, void 0, void 0, function* () {
            return yield this.repository.update(chatId, update);
        });
        this.leaveChat = (loggedUser_id, chatId) => __awaiter(this, void 0, void 0, function* () {
            return yield this.repository.deleteUser(loggedUser_id, chatId);
        });
    }
}
exports.default = ChatService;
