"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const message_1 = __importDefault(require("../validations/message"));
const validateMongoID_1 = __importDefault(require("../middlewares/validateMongoID"));
const express_1 = require("express");
const messageRoutes = (controller) => {
    const router = (0, express_1.Router)();
    router
        .route("/")
        .post(message_1.default, controller.createMessage)
        .delete(controller.deleteMessage); // two cases, mutiple messages or one, [body.id]
    router
        .route("/:chatId")
        .all(validateMongoID_1.default)
        .get(controller.getAllMessages);
    router
        .route("/:id")
        .all(validateMongoID_1.default)
        .put(controller.updateMessage);
    return router;
};
exports.default = messageRoutes;
