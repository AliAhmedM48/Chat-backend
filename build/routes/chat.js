"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const chat_1 = __importDefault(require("../controllers/chat"));
const validateMongoID_1 = require("../middlewares/validateMongoID");
class ChatRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.chatController = new chat_1.default();
        this.intializeRoutes();
    }
    intializeRoutes() {
        // * add avatar to chat model
        // * add isGroup to chat model = default false
        this.router.route("/createGroup").post(this.chatController.createChat);
        this.router
            .route("/:id")
            .all(validateMongoID_1.validateMongoID)
            // * load all chats by [user id]
            .get(this.chatController.getAllChats)
            // * middleware to check by [chat id , user id] if user is already in chat/group
            .put(this.chatController.updateChat)
            // * middleware to check by [chat id , user id] if user is already in chat/group
            // * remove user from group
            .delete(this.chatController.deleteChat);
    }
}
exports.default = new ChatRoutes().router;
