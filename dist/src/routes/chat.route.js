"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const chat_controller_1 = __importDefault(require("../controllers/chat.controller"));
class ChatRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.chatController = new chat_controller_1.default();
        this.intializeRoutes();
    }
    intializeRoutes() {
        this.router.get("/", this.chatController.getChats);
        this.router.post("/", this.chatController.createChat);
        this.router.get("/:id", this.chatController.getOneChat);
        this.router.put("/:id", this.chatController.updateChat);
        this.router.delete("/:id", this.chatController.deleteChat);
    }
}
exports.default = new ChatRoutes().router;
