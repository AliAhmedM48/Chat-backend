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
const badRequestError_1 = __importDefault(require("../errors/badRequestError"));
const unauthorizedError_1 = require("../errors/unauthorizedError");
const httpStatusCode_1 = require("../errors/httpStatusCode");
class MessageController {
    constructor() {
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
                const existingChat = yield chat_1.Chat.findOne({
                    $and: [
                        { isGroup: false },
                        { users: { $all: [id, receiverId] } },
                    ],
                });
                chatId = existingChat
                    ? existingChat._id
                    : (yield chat_1.Chat.create({ users: [id, receiverId] }))._id;
                //#endregion
            }
            // ! SECOND CASE /////// create group /////OR///// choose chat from chat list [chat / group]
            // ^ check by [chat id , user id] if user is [not] already in chat/group
            const existingChat = yield chat_1.Chat.findOne({
                _id: chatId,
                users: { $in: [id] },
            });
            if (!existingChat) {
                next(new unauthorizedError_1.UnauthorizedError("You are not in the chat"));
            }
            const message = yield message_1.Message.create({ senderId: id, chatId, body, seenIds: id, image });
            const lastMessage = (_a = (yield chat_1.Chat.findByIdAndUpdate(chatId, { lastMessage: message.body }, { new: true }))) === null || _a === void 0 ? void 0 : _a.lastMessage;
            res.status(httpStatusCode_1.HttpStatusCode.CREATED)
                .json({ success: true, data: message, lastMessage });
        }));
        this.getAllMessages = (0, express_async_handler_1.default)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { chatId } = req.params;
            const { loggedUser } = req; // logged user
            const checkChats = yield chat_1.Chat.findById(chatId);
            if (!checkChats) {
                return next(new badRequestError_1.default('chat id not found'));
            }
            let messages = yield message_1.Message.find({ chatId: chatId });
            // Update the seenIds array for each message
            for (const message of messages) {
                if (!message.seenIds.includes(loggedUser._id)) {
                    // Add the logged in user's ID to the seenIds array if not already present
                    message.seenIds.push(loggedUser._id);
                    // Save the updated message to the database
                    yield message.save();
                }
            }
            res.status(httpStatusCode_1.HttpStatusCode.OK).json({ success: true, data: messages });
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
                // ! CHECK user id
                _id: { $in: idsToDelete },
            });
            if (deletedMessages.deletedCount === 0) {
                return next(new notFoundError_1.NotFoundError("Messages not found"));
            }
            res.status(httpStatusCode_1.HttpStatusCode.OK).json({ success: true, data: deletedMessages });
        }));
    }
}
exports.MessageController = MessageController;
