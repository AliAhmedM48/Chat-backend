"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const chat_1 = __importDefault(require("../controllers/chat"));
const validateMongoID_1 = require("../middlewares/validateMongoID");
const chat_2 = require("../validations/chat");
class ChatRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.chatController = new chat_1.default();
        this.intializeRoutes();
    }
    intializeRoutes() {
        this.router.route("/")
            .get(this.chatController.getByUserIdOrByChatId);
        this.router.route("/createGroup")
            .post(chat_2.createChatValidations, this.chatController.createGroup);
        this.router.route("/:id")
            .all(validateMongoID_1.validateMongoID)
            .get(this.chatController.getByUserIdOrByChatId)
            .put(this.chatController.updateChat)
            .delete(this.chatController.deleteChat);
    }
}
exports.default = new ChatRoutes().router;
