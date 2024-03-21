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
exports.checkChatMembership = void 0;
const chat_1 = require("../models/chat");
const unauthorizedError_1 = require("../errors/unauthorizedError");
const express_async_handler_1 = __importDefault(require("express-async-handler"));
exports.checkChatMembership = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let { senderId, chatId } = req.body;
    const existingChat = yield chat_1.Chat.findOne({
        _id: chatId,
        users: { $in: [senderId] },
    });
    if (!existingChat) {
        next(new unauthorizedError_1.UnauthorizedError("You are not in the chat"));
    }
}));