"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const validateMongoID_1 = __importDefault(require("../middlewares/validateMongoID"));
const chat_1 = __importDefault(require("../validations/chat"));
const express_1 = require("express");
const chatRoutes = (controller) => {
    const router = (0, express_1.Router)();
    router
        .route("/")
        .get(controller.getByUserIdOrByChatId)
        .delete(controller.leaveChat);
    router
        .route("/createGroup")
        .post(chat_1.default, controller.createGroup);
    router
        .route("/:id")
        .all(validateMongoID_1.default)
        .get(controller.getByUserIdOrByChatId)
        .put(controller.updateChat);
    return router;
};
exports.default = chatRoutes;
