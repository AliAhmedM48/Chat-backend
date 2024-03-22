"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const message_1 = require("../controllers/message");
const validateMongoID_1 = require("../middlewares/validateMongoID");
const message_2 = require("../validations/message");
class MessageRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.controller = new message_1.MessageController();
        this.intializeRoutes();
    }
    intializeRoutes() {
        this.router
            .route("/")
            .post(message_2.createMessageValidations, this.controller.createMessage)
            .delete(this.controller.deleteMessage); // two cases, mutiple messages or one, [body.id]
        this.router
            .route("/:chatId")
            .all(validateMongoID_1.validateMongoID)
            .get(this.controller.getAllMessages);
        this.router
            .route("/:id")
            .all(validateMongoID_1.validateMongoID)
            .put(this.controller.updateMessage);
    }
}
exports.default = new MessageRoutes().router;
