"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const message_1 = require("../controllers/message");
const validateMongoID_1 = require("../middlewares/validateMongoID");
class MessageRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.controller = new message_1.MessageController();
        this.intializeRoutes();
    }
    intializeRoutes() {
        this.router
            .route("/")
            // * middleware to check by [chat id , user id] if user is already in chat/group
            .post(this.controller.createMessage)
            // * middleware to check by [chat id , user id] if user is already in chat/group
            // * and user is the owner of this message
            .delete(this.controller.deleteMessage);
        // this.router
        // .route("/messagesInGroup")
        // .post(this.controller.createMessagesInGroup);
        this.router
            .route("/:id")
            .all(validateMongoID_1.validateMongoID)
            // * middleware to check by [chat id , user id] if user is already in chat/group
            // * get messages by chat id
            .get(this.controller.getAllMessages)
            // * middleware to check by [chat id , user id] if user is already in chat/group
            // * and user is the owner of this message
            .put(this.controller.updateMessage);
    }
}
exports.default = new MessageRoutes().router;
