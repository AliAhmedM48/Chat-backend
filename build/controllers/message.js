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
exports.MessageController = void 0;
const message_1 = require("../models/message");
const chat_1 = require("../models/chat");
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const notFoundError_1 = require("../errors/notFoundError");
class MessageController {
    constructor() {
        this.createMessage = (0, express_async_handler_1.default)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            let { senderId, receiverId, body, chatId } = req.body;
            if (!(receiverId || chatId)) {
                res.status(401).json({ message: "Send chatId or receiverId" });
                return;
            }
            // * CHECK Chat ID /////// check if chat id is provided
            if (!chatId) {
                // ! FIRST CASE /////// private chat /////// in case client start new chat from users list
                //#region 
                const existingChat = yield chat_1.Chat.findOne({ $and: [{ isGroup: false }, { users: { $all: [senderId, receiverId] } }] });
                chatId = existingChat ? existingChat._id : (yield chat_1.Chat.create({ users: [senderId, receiverId] }))._id;
                //#endregion
            }
            // ! SECOND CASE /////// create group /////OR///// choose chat from chat list [chat / group]
            // ^ check by [chat id , user id] if user is [not] already in chat/group
            const existingChat = yield chat_1.Chat.findOne({ _id: chatId, users: { $in: [senderId] } });
            if (!existingChat) {
                res.status(401).json({ message: "Unauthorized: You are not in the chat" });
                return;
            }
            const message = yield message_1.Message.create({ senderId, chatId, body });
            res.status(201).json({ success: true, data: message });
        }));
        // createMessagesInGroup = asyncHandler(
        //   async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        //     const { senderId, chatId, body } = req.body;
        //     const message = await Message.create({
        //       senderId: senderId,
        //       chatId: chatId,
        //       body: body,
        //     });
        //     res.status(201).json({ success: true, data: message });
        //   }
        // );
        this.getAllMessages = (0, express_async_handler_1.default)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            let messages = yield message_1.Message.find({ chatId: id });
            if (messages.length === 0 || !messages) {
                return next(new notFoundError_1.NotFoundError("Messages not found"));
            }
            res.status(200).json({ success: true, data: messages });
        }));
        this.updateMessage = (0, express_async_handler_1.default)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const { senderId, chatId, body } = req.body;
            const message = yield message_1.Message.findByIdAndUpdate(id, { senderId, chatId, body }, { new: true });
            if (!message) {
                return next(new notFoundError_1.NotFoundError("message not found"));
            }
            res.status(200).json({ success: true, data: message });
        }));
        // ^ Delete messages by IDs
        this.deleteMessage = (0, express_async_handler_1.default)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.body;
            const idsToDelete = Array.isArray(id) ? id : [id];
            const deletedMessages = yield message_1.Message.deleteMany({
                _id: { $in: idsToDelete },
            });
            if (!deletedMessages) {
                return next(new notFoundError_1.NotFoundError("messages not found"));
            }
            res.status(200).json({ success: true, data: deletedMessages });
        }));
    }
}
exports.MessageController = MessageController;
