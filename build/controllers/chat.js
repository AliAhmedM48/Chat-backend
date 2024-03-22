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
const chat_1 = require("../models/chat");
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const notFoundError_1 = require("../errors/notFoundError");
const httpStatusCode_1 = require("../errors/httpStatusCode");
class ChatController {
    constructor() {
        this.createGroup = (0, express_async_handler_1.default)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            let { name, lastMessage } = req.body;
            let users = req.users; // from creation validation middleware
            const chat = yield chat_1.Chat.create({ name, users, lastMessage, isGroup: true });
            res.status(httpStatusCode_1.HttpStatusCode.CREATED).json({ message: "create OK", chat });
        }));
        this.getByUserIdOrByChatId = (0, express_async_handler_1.default)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            let id = req.params.id;
            if (!id) {
                id = req.loggedUser._id; // logged user   
            }
            let chats = yield chat_1.Chat.find({ _id: id }).populate("users");
            if (chats.length === 0) {
                chats = yield chat_1.Chat.find({ users: id }).populate("users");
            }
            res.status(httpStatusCode_1.HttpStatusCode.OK).json(chats);
        }));
        this.updateChat = (0, express_async_handler_1.default)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const chat = yield chat_1.Chat.findByIdAndUpdate(id, req.body, { new: true });
            if (!chat) {
                return next(new notFoundError_1.NotFoundError("chat not found"));
            }
            res.status(httpStatusCode_1.HttpStatusCode.OK).send(chat);
        }));
        this.deleteChat = (0, express_async_handler_1.default)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { userId, chatId } = req.body;
            // const { id } = req.params;
            // const chat = await Chat.findByIdAndDelete(id);
            const chat = yield chat_1.Chat.findByIdAndUpdate(chatId, {
                $pull: { users: userId },
            });
            console.log("User removed from chat successfully.");
            if (!chat) {
                return next(new notFoundError_1.NotFoundError("chat not found"));
            }
            res.status(200).send(`this chat ${chat} has been deleted`);
        }));
    }
}
exports.default = ChatController;
