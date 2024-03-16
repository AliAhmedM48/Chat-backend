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
const chat_model_1 = require("../models/chat.model");
const express_async_handler_1 = __importDefault(require("express-async-handler"));
class ChatController {
    constructor() {
        this.createChat = (0, express_async_handler_1.default)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const chat = yield chat_model_1.Chat.create(req.body);
            res.status(201).json({
                message: "create OK",
                chat,
            });
        }));
        this.getChats = (0, express_async_handler_1.default)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const chats = yield chat_model_1.Chat.find();
            res.status(200).send(chats);
        }));
        this.getOneChat = (0, express_async_handler_1.default)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const chat = yield chat_model_1.Chat.findById(id);
            res.status(200).send(chat);
        }));
        this.updateChat = (0, express_async_handler_1.default)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const chat = yield chat_model_1.Chat.findByIdAndUpdate(id, req.body, { new: true });
            res.status(200).send(chat);
        }));
        this.deleteChat = (0, express_async_handler_1.default)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const chat = yield chat_model_1.Chat.findByIdAndDelete(id);
            res.status(200).send(`this chat ${chat} has been deleted`);
        }));
    }
}
exports.default = ChatController;
