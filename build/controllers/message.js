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
const badRequestError_1 = __importDefault(require("../errors/badRequestError"));
const httpStatusCode_1 = __importDefault(require("../errors/httpStatusCode"));
class MessageController {
    constructor(messageService, chatService) {
        this.messageService = messageService;
        this.chatService = chatService;
        this.createMessage = (0, express_async_handler_1.default)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            let { receiverId, body, chatId, image } = req.body;
            const id = req.loggedUser._id; // logged user
            if (!(receiverId || chatId)) {
                return next(new badRequestError_1.default("send chatId or receiverId"));
            }
            // * CHECK Chat ID /////// check if chat id is provided
            if (!chatId) {
                // ! FIRST CASE /////// private chat /////// in case client start new chat from users list
                //#region
                const existingChat = yield this.chatService.getPreviousChat(id, receiverId);
                chatId = existingChat
                    ? existingChat._id
                    : (yield this.chatService.createPrivateChat(id, receiverId))._id;
                //#endregion
            }
            const message = yield this.messageService.createMessage(id, body, id, image, chatId);
            const lastMessage = (_a = (yield this.chatService.updateLastMessage(chatId, message.body))) === null || _a === void 0 ? void 0 : _a.lastMessage;
            res.status(httpStatusCode_1.default.CREATED).json({ success: true, data: message, lastMessage });
        }));
        this.getAllMessages = (0, express_async_handler_1.default)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { chatId } = req.params;
            const id = req.loggedUser._id; // logged user
            const checkChats = yield this.chatService.findChatsByChatId(chatId);
            if (!checkChats) {
                return next(new badRequestError_1.default('chat id not found'));
            }
            const messages = yield this.messageService.getChatMessages(chatId, id);
            res.status(httpStatusCode_1.default.OK).json({ success: true, data: messages });
        }));
        this.updateMessage = (0, express_async_handler_1.default)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const loggedUser_id = req.loggedUser._id; // logged user
            const { body, image } = req.body;
            const message = yield this.messageService.updateMessage(id, loggedUser_id, { body, image });
            res.status(httpStatusCode_1.default.OK).json({ success: true, data: message });
        }));
        // ^ Delete messages by IDs
        this.deleteMessage = (0, express_async_handler_1.default)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.body;
            const loggedUser_id = req.loggedUser._id; // logged user
            const deletedMessages = yield this.messageService.deleteMessages(id, loggedUser_id);
            res.status(httpStatusCode_1.default.NO_CONTENT).end();
        }));
    }
}
exports.default = MessageController;
